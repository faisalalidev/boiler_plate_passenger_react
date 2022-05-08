// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { Text, ImageBanner, BlueHeading } from "../../components";
import styles from "./styles";
import { Metrics, Colors, ApplicationStyles, Fonts } from "../../theme";

class About_Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      html: `<html>
      <head>
        <meta charset="utf-8" />
        <title>Untitled Document</title>
        <style>
          body {
            font-family: sans-serif;
          }
          .wrapper {
            max-width: 500px;
            margin: auto;
            background: #f5f5f5;
            padding: 15px;
          }
          .wrapper img {
            width: 100%;
          }
          .wrapper h1 {
            font-weight: 300;
            color: #004186;
          }
          .first_pra {
            line-height: 1.6;
          }
          .first_div {
            padding: 15px;
            margin-bottom: 10px;
            background: white;
          }
          .first_div p {
            line-height: 1.4;
          }
        </style>
      </head>
    
      <body>
        <div class="wrapper">
          <!-- <img src="Untitled-1.png" alt=""> -->
          <img src="http://lhrlaapi.viftechuat.com/1x.jpg" alt="" />
    
          <h1>Eligibility Requirements</h1>
          <p class="first_pra">
            At AUOVS we ensure that all requirements of regulatory bodies are met
            and hence provides clear guidelines to the applicants and facilitates
            their process of meeting those requirements.
          </p>
          <div class="first_div">
            <p>
              6 years bachelor’s degree from a recognized institution accredited
              either by the department of education through accrediting bodies in
              the USA or the accrediting bodies in their respective countries in
              case of foreign degree.
            </p>
          </div>
          <div class="first_div">
            <p>
              Must be able to communicate (Read, write and speak) in English.
              Candidates from countries where native language is not English must
              provide evidence that their last education is from an institution
              where medium of communication is English or IELTS band score of at
              least 6.5 or TOEFL score of at least 550 paper based while 70 for
              internet based or MELAB score of at least 77 or PTE score of 59.
            </p>
          </div>
        </div>
      </body>
    </html>`
    };
  }
  render() {
    const { html } = this.state;
    console.log("HTML ************** ", html);
    return (
      <ScrollView style={[styles.container]}>
        <HTML
          html={html}
          // containerStyle={ApplicationStyles.htmlContainer}
          tagsStyles={{
            img: { marginHorizontal: Metrics.baseMargin },
            p: {
              fontFamily: Fonts.type.light,
              fontSize: Fonts.size.normal,
              marginHorizontal: Metrics.baseMargin
            },
            h1: {
              fontFamily: Fonts.type.bold,
              fontSize: Fonts.size.xxLarge,
              color: Colors.text.quaternary,
              marginHorizontal: Metrics.baseMargin,
              paddingVertical: Metrics.smallMargin
            }
          }}
          baseFontStyle={{
            fontSize: Fonts.size.normal,
            fontFamily: Fonts.type.light
          }}
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(About_Detail);

// render() {
//   return (
//     <View style={styles.container}>
//       <ImageBanner style={{ marginVertical: Metrics.baseMargin }} />
//       <BlueHeading title="Why choose AUOVS" />
//     </View>
//   );
// }
