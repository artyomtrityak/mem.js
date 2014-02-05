var expect = chai.expect;

describe('Mem.js unset', function(){

  it('should have possibility to do unset', function() {
    var SomeFunc = sinon.spy();
    var AnotherFunc = sinon.spy();

    Mem.set('test1', SomeFunc);
    Mem.set('test2', AnotherFunc);

    var ins1 = Mem.get('test1');
    expect(ins1).to.not.be.equal(undefined);

    var ins2 = Mem.get('test2');
    expect(ins2).to.not.be.equal(undefined);

    Mem.unset('test1');
    ins1 = Mem.get('test1');
    expect(ins1).to.be.equal(undefined);

    ins2 = Mem.get('test2');
    expect(ins2).to.not.be.equal(undefined);

    Mem.set('test1', SomeFunc);
    ins1 = Mem.get('test1');
    expect(ins1).to.not.be.equal(undefined);

    Mem.unset();
    ins1 = Mem.get('test1');
    expect(ins1).to.be.equal(undefined);
    ins2 = Mem.get('test2');
    expect(ins2).to.be.equal(undefined);

    var RemoveDisFn = function() {};
    RemoveDisFn.prototype.remove = sinon.spy();
    RemoveDisFn.prototype.dispose = sinon.spy();

    Mem.set('test1', RemoveDisFn);

    expect(RemoveDisFn.prototype.remove.callCount).to.be.equal(0);
    expect(RemoveDisFn.prototype.dispose.callCount).to.be.equal(0);

    Mem.unset('test1');

    expect(RemoveDisFn.prototype.remove.callCount).to.be.equal(1);
    expect(RemoveDisFn.prototype.dispose.callCount).to.be.equal(1);
  });
  
});