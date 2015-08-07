var should = require('should');
var ong = require('../');

describe('ong', function () {
	describe('init', function () {
		it('should not register "Promise" if it already exists in global namespace', function () {
			var globalObj = { Promise: 1 };
			should.throws(function () {
				ong.__buildModule(globalObj).init();
			});
		});
		it('should not register "_" if it already exists in global namespace', function () {
			var globalObj = { _: 1 };
			should.throws(function () {
				ong.__buildModule(globalObj).init();
			});
		});
		it('should not register "$" if it already exists in global namespace', function () {
			var globalObj = { $: 1 };
			should.throws(function () {
				ong.__buildModule(globalObj).init();
			});
		});
		it('should register "Promise" to bluebird implementation', function () {
			var globalObj = {};
			ong.__buildModule(globalObj).init();
			globalObj.Promise.should.equal(require('bluebird'));
		});
		it('should register "_" to lodash implementation', function () {
			var globalObj = {};
			ong.__buildModule(globalObj).init();
			globalObj._.should.equal(require('lodash'));
		});
		it('should register "$" to empty object', function () {
			var globalObj = {};
			ong.__buildModule(globalObj).init();
			globalObj.$.should.eql({});
		});
	});
	describe('register', function () {
		it('should register custom properties of global "$"', function () {
			var globalObj = {};
			ong.__buildModule(globalObj).init().register('customProp', { a: 'b' });
			globalObj.$.customProp.should.eql({ a: 'b' });
		});
		it('should register multiple custom properties of global "$"', function () {
			var globalObj = {};
			ong.__buildModule(globalObj).init().register({
				a: 'b',
				c: 1
			});
			globalObj.$.a.should.eql('b');
			globalObj.$.c.should.eql(1);
		});
		it('should not allow to register anything that was previously registered', function () {
			var globalObj = {};
			var g = ong.__buildModule(globalObj).init().register('already', 1);
			should.throws(function () {
				g.register('already', 2);
			});
		});
	});
});
