var expect = chai.expect;

describe('Mem.js', function(){
  
  it('should export correct composer', function(){
    expect(Mem).to.be.a('object');
    expect(Mem.set).to.be.a('function');
    expect(Mem.get).to.be.a('function');
    expect(Mem.unset).to.be.a('function');
    expect(Mem.manage).to.be.a('function');
  });

  it('should have correct set', function() {
    var SomeFunc = sinon.spy();
    var AnotherFunc = sinon.spy();
    var ins = Mem.set('test1', SomeFunc, 1, 2, 3);

    expect(ins).to.be.instanceof(SomeFunc);
    expect(SomeFunc.calledWith(1, 2, 3)).to.be.equal(true);

    var ins2 = Mem.set('test1', SomeFunc, 1, 2, 3);
    expect(ins2).to.be.equal(ins);

    var ins3 = Mem.set('test2', SomeFunc, 1, 2, 3);
    expect(ins3).to.not.be.equal(ins);

    var ins4 = Mem.set('test1', AnotherFunc, 1, 2, 3);
    expect(ins4).to.not.be.equal(ins);

    var testObj = {a: 1, b: 'test'};
    var ins5 = Mem.set('test1', AnotherFunc, testObj);
    expect(AnotherFunc.calledWith(testObj)).to.be.equal(true);
    expect(ins4).to.not.be.equal(ins5);
  });

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