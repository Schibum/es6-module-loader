//

describe('Custom Loader', function () {

  describe('#import', function () {

    describe('scripts', function () {
      it('should support ES6 scripts', function (done) {
        customLoader.import('test/loader/test.js')
          .then(function (m) {
            expect(m.loader).to.be.equal('custom');
          })
          .then(done, done)
      });

      it('should support AMD scripts', function (done) {
        customLoader.import('test/loader/amd.js')
          .then(function (m) {
            expect(m.format).to.be.equal('amd');
          })
          .then(done, done);
      });
    });

    describe('special #locate path rule', function a() {

      it('should support special loading rules', function (done) {
        customLoader.import('path/custom.js')
          .then(function (m) {
            expect(m.path).to.be.ok();
          })
          .then(done, done);
      })

    });

    describe('errors', function () {

      function supposeToFail() {
        expect(false, 'should not be successful').to.be.ok();
      }
      var base = System.baseURL + 'test/loader/';

      it('should make the normalize throw', function (done) {
        customLoader.import('test/loader/error1-parent.js')
          .then(supposeToFail, function (e) {
            expect(e.toString()).to.contain('Error loading "' + base + 'error1-parent.js" at ' + base + 'error1-parent\.js');
          })
          .then(done, done);
      });

      it('should make the locate throw', function (done) {
        customLoader.import('test/loader/error2')
          .then(supposeToFail, function (e) {
            expect(e.toString()).to.be.contain('Error loading "' + base + 'error2" at ' + base + 'error2');
          })
          .then(done, done);
      });

      it('should make the fetch throw', function (done) {
        customLoader.import('test/loader/error3')
          .then(supposeToFail, function (e) {
            expect(e.toString()).to.be.contain('Error loading "' + base + 'error3" at ' + base + 'error3');
          })
          .then(done, done);
      });

      it('should make the translate throw', function (done) {
        customLoader.import('test/loader/error4')
          .then(supposeToFail, function (e) {
            expect(e.toString()).to.be.contain('Error loading "' + base + 'error4" at ' + base + 'error4');
          })
          .then(done, done);
      });

      it('should make the instantiate throw', function (done) {
        customLoader.import('test/loader/error5')
          .then(supposeToFail, function (e) {
            expect(e.toString()).to.be.contain('Error loading "' + base + 'error5" at ' + base + 'error5');
          })
          .then(done, done);
      });

    });

  });

  describe('#normalize', function () {
    it('should support async normalization', function (done) {
      customLoader.normalize('asdfasdf')
        .then(function (normalized) {
          return customLoader.import(normalized);
        })
        .then(function (m) {
          expect(m.n).to.be.equal('n');
        })
        .then(done, done);
    });
  });
});
