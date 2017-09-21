describe("background specs", function(){
  beforeEach(function(){
     console.log(interval);
  });

  describe("When clean_json_response is called", function () {
    it("returns clean json", function(){
      var dirty_json_from_flikr = "jsonFlickrFeed({ \"sth\": \"here\" })";
      expect(clean_json_response(dirty_json_from_flikr)).toBe("{ \"sth\": \"here\" }");
    });
  });
});
