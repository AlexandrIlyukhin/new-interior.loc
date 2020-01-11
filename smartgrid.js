module.exports = {
    columns: 12,
    offset: "5px", //2.75%
    //mobileFirst: true,
    container: {
        maxWidth: "1380px",
        fields: "30px"
    },
    breakPoints: {
        lg: {
            width: "1100px"
        },

        sm: {
            width: "880px"
        },
        xs: {
            width: "768px",
            fields: "15px"
        },
        xls: {
            width: "600px",
            fields: "15px"
        },
        xss: {
            width: "500px",
            fields: "15px"
        },

        xxs: {
            width: "400px",
            fields: "15px"
            /*
            offset: "10px",
            fields: "5px"
            */
        }
    },
    //detailedCalc: true
};