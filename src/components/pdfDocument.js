import React, {Component} from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import moment from "moment";

const POSTER_PATH = "https://image.tmdb.org/t/p/w154";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#ffffff"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    movieContainer: {
        backgroundColor: "#f6f6f5",
        display: "flex",
        flexDirection: "row",
        padding: 5
    },
    movieDetails: {
        display: "flex",
        marginLeft: 5
    },
    movieTitle: {
        fontSize: 15,
        marginBottom: 10, 
        color: "black"
    },
    movieOverview: {
        fontSize: 10
    },

    image: {
        height: 200,
        width: 150
    },
    subtitle: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: 150,
        alignItems: "center",
        marginBottom: 12
    },
    vote: {
        display: "flex",
        flexDirection: "row"
    },
    rating: {
        height: 10,
        width: 10
    },
    vote_text: {
        fontSize: 10
    },
    vote_pop: {
        fontSize: 10,
        padding: 2,
        backgroundColor: "#61C74F",
        color: "#fff"
    },
    vote_pop_text: {
        fontSize: 10,
        marginLeft: 4
    },
    overviewContainer: {
        minHeight: 110
    },
    detailsFooter: {
        display: "flex",
        flexDirection: "row"
    },
    lang: {
        fontSize: 8,
        fontWeight: 700
    },
    vote_average: {
        fontSize: 8,
        marginLeft: 4,
        fontWeight: "bold"
    }
});


class PdfDocument extends Component {

    constructor(props){
        super(props);
    }

    renderData(){
        if(this.props.data.length > 0 ){
            return this.props.data.map(x=> {
                return(
                    <Text style = {styles.movieTitle}>{x.importe}</Text>
                )
            })
        } else {
            return <Text>A mamarla</Text>
        }

    }

    render(){
        console.log(this.props.data);

        return (
            <Document>
              <Page style={styles.page}>
                {this.props.data
                    ? this.props.data.map((a, index) => {
                            return (
                                <View key={index} style={styles.movieContainer}>
                                    <Image
                                        style={styles.image}
                                        source={
                                            a.poster_path !== null
                                                ? `${POSTER_PATH}${a.poster_path}`
                                                : "150.jpg"
                                        }
                                    />
                                    <View style={styles.movieDetails}>
                                        <Text style={styles.movieTitle}>{a.cliente}</Text>
                                        <View style={styles.subtitle}>
                                            <View style={styles.vote}>
                                                <Image source="star.png" style={styles.importe} />
                                                <Text style={styles.vote_text}>{a.año}</Text>
                                            </View>
                                            <View style={styles.vote}>
                                                <Text style={styles.vote_pop}>{a.mes}</Text>
                                            </View>
                                        </View>

                                    </View>
                                 </View>
                            );
                    })
                : ""}
              </Page>
            </Document>
        );
    }
}

export default PdfDocument;