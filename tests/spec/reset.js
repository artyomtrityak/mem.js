var expect = chai.expect;

describe('Mem.js reset', function(){
  it('should reset one on reset', function() {
    var SomeFunc = sinon.spy();
    Mem.set('test1', SomeFunc, 1, 2, 3);
    expect(SomeFunc.calledWith(1,2,3)).to.be.equal(true);
    expect(SomeFunc.callCount).to.be.equal(1);

    var ins = Mem.get('test1');
    expect(ins).to.not.be.equal(undefined);

    Mem.reset('test1');
    var ins2 = Mem.get('test1');
    expect(ins2).to.not.be.equal(undefined);
    expect(ins2).to.not.be.equal(ins);
    expect(SomeFunc.calledWith(1,2,3)).to.be.equal(true);
    expect(SomeFunc.callCount).to.be.equal(2);
  });

  it('should reset all on reset without params', function() {
    
  });
});