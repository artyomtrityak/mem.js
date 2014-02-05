var expect = chai.expect;

describe('Mem.js basics', function(){
  
  it('should export correct Mem', function(){
    expect(Mem).to.be.a('object');
    expect(Mem.set).to.be.a('function');
    expect(Mem.get).to.be.a('function');
    expect(Mem.unset).to.be.a('function');
    expect(Mem.manage).to.be.a('function');
  });
  
});