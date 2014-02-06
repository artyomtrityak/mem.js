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
    var SomeFunc = sinon.spy(),
        AnotherFunc = sinon.spy();
    
    var ins1 = Mem.set('test1', SomeFunc);
    var ins2 = Mem.set('test2', AnotherFunc);

    Mem.reset();

    var ins1New = Mem.get('test1');
    var ins2New = Mem.get('test2');

    expect(ins1).to.not.be.equal(ins1New);
    expect(ins2).to.not.be.equal(ins2New);

    expect(ins1).to.be.instanceof(SomeFunc);
    expect(ins1New).to.be.instanceof(SomeFunc);

    expect(ins2).to.be.instanceof(AnotherFunc);
    expect(ins2New).to.be.instanceof(AnotherFunc);


  });
});