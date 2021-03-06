const expect = require('expect')
const {UserList} = require('../utils/users.js')

describe('UserList', () => {


    beforeEach(() => {
        userList = new UserList()
        userList.users = [{
            id:1,
            name:"tommy",
            room: 'room1',
        },
        {
            id:2,
            name:"jack",
            room: 'room1'
        },
        {
            id:3,
            name:"elizabeth",
            room: 'room2'
        },
        {
            id:4,
            name:"bobby",
            room: 'room3'
        },
        {
            id:5,
            name:"anthony",
            room: 'room3'
        }]
    })

    it('should add new user', () => {
        let tempUser = {id: 6,name:"mickey",room:"room2"}
        userList.addUser(tempUser)
        expect(userList.users[5]).toEqual(tempUser)
        expect(userList.users.length).toEqual(6)
    })
    it("should return user with given id", () => {
        expect(userList.getUser(3)).toEqual({
            id:3,
            name:"elizabeth",
            room: 'room2'
        })
    })
    it("should remove user from list", () => {
        userList.removeUser(1)
        expect(userList.removeUser(1)).toBeFalsy()
        expect(userList.users.length).toEqual(4);
        
    })

    it('should return array with users with given room', () => {
        expect(userList.getRoomUsers('room3').length).toEqual(2)
        expect(userList.getRoomUsers('room3')).toEqual([{
            id:4,
            name:"bobby",
            room: 'room3'
        },
        {
            id:5,
            name:"anthony",
            room: 'room3'
        }])
    })
  
})