var expect = chai.expect;

describe('Mem.js get', function(){

  it('should allow to do get', function() {
    var SomeFunc = sinon.spy();
    var AnotherFunc = sinon.spy();

    var noResult = Mem.get('testXXX');
    expect(noResult).to.be.equal(undefined);

    Mem.set('test1', SomeFunc);
    Mem.set('test2', AnotherFunc);

    var ins = Mem.get('test1');
    expect(ins).to.be.instanceof(SomeFunc);

    var ins2 = Mem.get('test2');
    expect(ins2).to.be.instanceof(AnotherFunc);

    var ins3 = Mem.get('test2');
    expect(ins3).to.be.equal(ins2);
  });
  
});