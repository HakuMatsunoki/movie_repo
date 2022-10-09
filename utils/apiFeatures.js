const { Op } = require('sequelize');

const models = require('../models');

/**
 * Class to implement sort, filter, paginate API features.
 */
class APIFeatures {
  #dbQuery;

  #reqQueryObj;

  /**
   * Constructor.
   * @param {Object} reqQueryObj
   */
  constructor(reqQueryObj) {
    this.#dbQuery = {};
    this.#reqQueryObj = reqQueryObj;
  }

  /**
   * Search functionality.
   * @returns {Object}
   */
  search() {
    const queryObj = this.#reqQueryObj;
    const allowedSearchFields = ['actor', 'title', 'search'];

    allowedSearchFields.forEach((field, idx) => {
      if (!queryObj[field]) return;

      if (idx === 0) {
        this.#dbQuery.include = [
          {
            model: models.Actor,
            where: { name: { [Op.like]: `%${queryObj[field]}%` } },
            attributes: []
          }
        ];

        return;
      }

      if (idx === 1) {
        this.#dbQuery.where = { [field]: { [Op.like]: `%${queryObj[field]}%` } };

        return;
      }

      if (idx === 2) {
        // search functionality (search=<value> query) is not properly implemented!!!!
        this.#dbQuery.include = [
          {
            model: models.Actor,
            where: { name: { [Op.like]: `%${queryObj[field]}%` } },
            attributes: []
          }
        ];
      }
    });

    return this;
  }

  /**
   * Sort by field.
   * @returns {Object}
   */
  sort() {
    const { sort, order } = this.#reqQueryObj;

    const allowedSortFieldsMap = {
      id: true,
      title: true,
      year: true
    };

    const allowedOrderFieldsMap = {
      ASC: true,
      DESC: true
    };

    const sortBy = allowedSortFieldsMap[sort] ? sort : 'id';
    const sortOrder = allowedOrderFieldsMap[order] ? order : 'ASC';

    this.#dbQuery.order = [[sortBy, sortOrder]];

    return this;
  }

  /**
   * Pagination. Use limit and skip numbers.
   * @returns {Object}
   */
  paginate() {
    this.#dbQuery.limit = +this.#reqQueryObj.limit || 20;
    this.#dbQuery.offset = +this.#reqQueryObj.offset || 0;

    return this;
  }

  /**
   * Get query.
   * @returns {Object}
   */
  build() {
    return this.#dbQuery;
  }
}

module.exports = APIFeatures;
