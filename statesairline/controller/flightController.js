const flights = require('../repository/flightList');
const fs = require('fs');

module.exports = {
  // [GET] /flight
  // 요청 된 파라미터 departure_times, arrival_times 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  // 요청 된 파라미터 departure, destination 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  // TODO:
  findAll: (req, res) => {
    const { departure_times, arrival_times, destination, departure } = req.query; // req.query : url의 query를 문자열로 변환(req.params 비교))
    if (departure_times && arrival_times) {
      let filtered = flights.filter(flight => {
        return flight.departure_times === departure_times && flight.arrival_times === arrival_times
      });
      return res.json(filtered);
    }
    if (destination && departure) {
      let filtered = flights.filter(flight => {
        flight.destination === destination && flight.departure === departure
      });
      return res.json(filtered);
    }
    return res.json(flights);
  },
  // [GET] /flight/:uuid
  // 요청 된 uuid 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: (req, res) => {
    const { uuid } = req.params;
    // TODO:
    if (uuid) {
      let filtered = flights.filter(flight => {
        return flight.uuid === uuid;
      });
      return res.json(filtered);
    }
  },

  // Advanced
  // [PUT] /flight/:uuid 요청을 수행합니다.
  // 요청 된 uuid 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    const { uuid } = req.params;
    const bodyData = req.body;
    // TODO:
    // filter된 데이터(객체)를 bodyData와 합친다(object.assign())
    if (uuid) {
      let filtered = flights.filter(flights => flights.uuid === uuid);
      console.log(filtered); // flightList에서 필터된 객체 데이터
      const bodyUpdate = Object.assign(filtered[0], bodyData);
      return res.json(bodyUpdate);
    }
  }
};
