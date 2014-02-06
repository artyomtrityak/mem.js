var expect = chai.expect;

describe('Mem.js basics', function(){

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

  it('should check params in set', function() {
    var SomeFunc = sinon.spy(),
        params = {test: 1, resut: 2};

    var ins1 = Mem.set('test1', SomeFunc, params);
    var ins2 = Mem.set('test1', SomeFunc);
    expect(ins1).to.not.be.equal(ins2);

    ins1 = Mem.set('test1', SomeFunc, params);
    ins2 = Mem.set('test1', SomeFunc, params);
    expect(ins1).to.be.equal(ins2);

    ins1 = Mem.set('test1', SomeFunc, {test: 1, resut: 'str', r: [1, 2]});
    ins2 = Mem.set('test1', SomeFunc, {test: 1, resut: 'str', r: [1, 2]});
    expect(ins1).to.be.equal(ins2);
  });

  it('should allow set objects', function() {

  });

  it('should throw exception if not object or function', function() {

  });
  
});