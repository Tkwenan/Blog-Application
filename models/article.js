'use strict';
const Sequelize = require('sequelize');
const moment = require('moment');

module.exports = (sequelize) => {
  class Article extends Sequelize.Model {
    publishedAt() {
      //format the createdAt timestamp of each model instance
      const date = moment(this.createdAt).format('MMMM D, YYYY, h:mma');
      return date; //return the formatted date
    }
    shortDescription() {
      //conditional ternary operator
      const shortDesc = this.body.length > 200 ? this.body.substring(0 ,200) + '...' : this.body;
      return shortDesc;
    }
  }
  Article.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: {
          msg: '"Title" is required'
        }
      }
    },
    author: Sequelize.STRING,
    body: Sequelize.TEXT
  }, { sequelize });

  return Article;
};
