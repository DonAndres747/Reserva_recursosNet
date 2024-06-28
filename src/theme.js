
const theme = {
    colors: {
        blanco: '#fff',
        azulNet: 'rgb(0, 38, 58)',
        azulNetDisable: 'rgb(65, 89, 102)',
        azulNetTransp: 'rgba(0, 38, 58, 0.8)',
        naranjaNet: 'rgb(255,103,29)',
        naranjaNetDisable: 'hsl(24, 100%, 55%)',
        naranjaNetTransp: 'rgba(255, 103, 29, 0.8)',
        blanco: "white",
        blancoNetTransp: 'rgba( 255, 255, 255, 0.8)',
    },
    fontSizes: {
        buttons: Platform.OS === 'ios' ? 19 : 20,
        subheading: 16,
        subText: 13,
        tittle: 33,
        subtittle: Platform.OS === 'ios' ? 21 : 23
    },
    fontWeight: {
        buttons: 700,
        bold: 'bold',
        semiBold: 'semibold'
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
