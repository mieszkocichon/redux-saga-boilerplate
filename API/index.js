export const fetch = (url) => {
    return {"results":[{"gender":"female","name":{"title":"Ms","first":"Fatma","last":"Tahincioğlu"},"location":{"street":{"number":4123,"name":"Istiklal Cd"},"city":"Kars","state":"Bingöl","country":"Turkey","postcode":26538,"coordinates":{"latitude":"78.9280","longitude":"51.6234"},"timezone":{"offset":"-3:00","description":"Brazil, Buenos Aires, Georgetown"}},"email":"fatma.tahincioglu@example.com","login":{"uuid":"6bc56772-212f-4f7d-afde-36189aed62c2","username":"whiteelephant455","password":"sparrow","salt":"fl08DZl7","md5":"726c371a849e7b2f20782c58780bebe6","sha1":"b3aa1419b766a5a557ff4f487cf5d0858a38f691","sha256":"8460d978b04f93a17670db0cd64e3d12f9602fc8799ab31c5abdd976bc461136"},"dob":{"date":"1949-05-10T06:16:14.897Z","age":70},"registered":{"date":"2011-02-19T02:42:38.880Z","age":8},"phone":"(688)-317-1224","cell":"(914)-601-4930","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/59.jpg","medium":"https://randomuser.me/api/portraits/med/women/59.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/59.jpg"},"nat":"TR"}],"info":{"seed":"23d73a80f63cd336","results":1,"page":1,"version":"1.3"}}
}

export const authorizeUser = (user, password) => {
    return `${user}_${password}`
}

export const storeItem = (data) => {
    if (data.token) {
        localStorage.setItem('token', data.token);
    }
}

export const clearItem = (item) => {
    localStorage.removeItem(item)
}