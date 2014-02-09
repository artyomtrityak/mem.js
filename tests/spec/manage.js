var expect = chai.expect;

describe('Mem.js manage', function(){
  it('should manage compositions', function() {
    var SomeFunc = sinon.spy();
    var ins = Mem.set('test3', SomeFunc);

    Mem.manage();

    var sameIns = Mem.get('test3');
    expect(ins).to.be.equal(sameIns);

    Mem.manage();

    var noIns = Mem.get('test3');
    expect(noIns).to.be.equal(undefined);
  });

  it('should reset cleanup on set', function() {
    var SomeFunc = sinon.spy();
    Mem.set('test4', SomeFunc);

    Mem.manage();

    Mem.set('test4', SomeFunc);
    
    Mem.manage();
    var ins = Mem.get('test4');
    expect(ins).to.not.be.equal(undefined);
  });

  it('should manage all compositions', function() {
    var SomeFunc = sinon.spy();
    
    Mem.set('test3', SomeFunc);
    Mem.set('test4', SomeFunc);
    Mem.set('test5', SomeFunc);

    Mem.manage();

    var ins3 = Mem.get('test3');
    var ins4 = Mem.get('test4');
    var ins5 = Mem.get('test5');
    expect(ins3).to.not.be.equal(undefined);
    expect(ins4).to.not.be.equal(undefined);
    expect(ins5).to.not.be.equal(undefined);

    Mem.manage();

    ins3 = Mem.get('test3');
    ins4 = Mem.get('test4');
    ins5 = Mem.get('test5');
    expect(ins3).to.be.equal(undefined);
    expect(ins4).to.be.equal(undefined);
    expect(ins5).to.be.equal(undefined);
  });
});