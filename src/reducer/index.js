let totalState = {
    token: null
};
let person = [{
        id: 0,
        name: "小明",
        info:{
            age:12
        }
    },
    {
        id: 1,
        name: "小张"
    },
    {
        id: 2,
        name: "小李"
    },
    {
        id: 3,
        name: "小孙"
    },
    {
        id: 1,
        name: "小周"
    },
    {
        id: 2,
        name: "小陈"
    },
    {
        id: 2,
        name: "小陈"
    },
    {
        id: 2,
        name: "小陈"
    },
    {
        id: 2,
        name: "小陈"
    },
];
person.forEach((i,index) => {
    console.log(index)
    if(index % 3 === 0){
        person.push({
            id: 1,
            name: "小周"
        })
    }
})
console.log(person)
export default function (state = totalState, action) {
    switch (action.type) {
        case 'LOGIN':
            return Object.assign({}, state, {
                token: action.token
            });
        default:
            return state;
    }
}