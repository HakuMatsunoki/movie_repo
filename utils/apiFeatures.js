const { MONGO_QUERY_REGEX } = require('../constants/regexp');

/**
 * Class to implement sort, filter, paginate API features.
 */
class APIFeatures {
  #query;

  #reqQueryObj;

  /**
   * Constructor.
   * @param {Object} dbQuery
   * @param {Object} reqQueryObj
   */
  constructor(dbQuery, reqQueryObj) {
    this.#query = dbQuery;
    this.#reqQueryObj = reqQueryObj;
  }

  /**
   * Filter functionality, using lte, gte, lt, gt.
   * @returns {Object}
   */
  filter() {
    const queryObj = { ...this.#reqQueryObj };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach((item) => delete queryObj[item]);

    const queryString = JSON.stringify(queryObj).replace(MONGO_QUERY_REGEX, (match) => `$${match}`);

    this.#query.find(JSON.parse(queryString));

    return this;
  }

  /**
   * Sort by field.
   * @returns {Object}
   */
  sort() {
    const sortBy = this.#reqQueryObj.sort;

    this.#query = sortBy ? this.#query.sort(sortBy.split(',').join(' ')) : this.#query.sort('-createdAt');

    return this;
  }

  /**
   * Set fields to show.
   * @returns {Object}
   */
  limitFields() {
    const { fields } = this.#reqQueryObj;

    if (!fields) {
      this.#query = this.#query.select('-__v');

      return this;
    }

    const fieldsArr = fields.split(',').filter((item) => item !== 'hidden');
    this.#query = this.#query.select(fieldsArr.join(' '));

    return this;
  }

  /**
   * Pagination. Use limit and skip numbers.
   * @returns {Object}
   */
  paginate() {
    const page = +this.#reqQueryObj.page || 1;
    const limit = +this.#reqQueryObj.limit || 10;
    const skip = (page - 1) * limit;

    this.#query = this.#query.skip(skip).limit(limit);

    return this;
  }

  /**
   * Launch mongo query.
   * @returns {Object}
   */
  launch() {
    return this.#query;
  }
}

module.exports = APIFeatures;
