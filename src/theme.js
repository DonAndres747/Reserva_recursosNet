
const theme = {
    colors: {
        blanco: '#fff',
        azulNet: 'rgb(0, 38, 58)',
        naranjaNet: 'rgb(255,103,29)'
    },
    fontSizes: {
        buttons: 20,
        subheading: 16,
        subText: 13,
        tittle: 33,
        subtittle: Platform.OS === 'ios' ? "20%" : 23
    },
    fontWeight: {
        buttons: 700,
        bold: 'bold'
    },
    width: {
        buttonCont: 190,
        buttonAction: 90,
        input: 300,
        input2: 280
    },
    height: {
        buttonCont: 40
    },
    alingment: {
        center: 'center',
    },
    margin: {
        margin: 20,
        marginLeft: 15,
        maringTop: 12,
        marginRight: 10
    }
}

export default theme;
