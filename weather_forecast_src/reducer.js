 

export const reducer = (state, action) => {
    switch(action.type) {
        case "PARÇALI BULUTLU":
            return {...state,
                dataSrc: "https://accuweather.accuweather.com/sites/default/files/07-s.png"
            }
        case "GÜNEŞLİ":
            return {...state,
                dataSrc:"https://https.accuweather.com/sites/default/files/07-s.png"
        }
        case "BULUTLU":
            return {...state,
                dataSrc:"https://developer.accuweather.com/sites/default/files/07-s.png"
            }
        case "YAĞMURLU":
            return {...state,
                dataSrc:"https://developer.accuweather.com/sites/default/files/07-s.png"
            }
        default:
            return state
    }
}