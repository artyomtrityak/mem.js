var expect = chai.expect;

describe('Composer', function(){
  
  it('should export correct composer', function(){
    expect(Composer).to.be.a('function');
  });
  
});