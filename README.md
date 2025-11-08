middelware 테스트코드.

const middleware = store => next => action => {
    //미들웨어 작업
}

function middleware(store) {
    return function (next) {
        return function (action) {
            //미들웨어 작업
        }
    }
}