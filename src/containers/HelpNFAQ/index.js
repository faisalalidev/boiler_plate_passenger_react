// @flow
import PropTypes from "prop-types";
import { connect } from "react-redux";
import React, { Component } from "react";
import { View, Image, ScrollView } from "react-native";
import {
    Text,
    AppButton,
    Separator,
    ActivityIndicator,
    Loading
} from "../../components";
import styles from "./styles";
import Accordion from "react-native-collapsible/Accordion";
import { Colors, Images } from "../../theme";
import { request as faqRequest } from "../../actions/FaqAction";
import Utils from "../../util";
import _ from "lodash";

const SECTIONS = [
    {
        title: "What are Paws and passengers rates?",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`,
        sectionTitle: "Quick Help"
    },
    {
        title: "Why am I being charged a cancellation fee?",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`
    },
    {
        title: "Payments and receipts",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`,
        sectionTitle: "More Help Topics"
    },
    {
        title: "Safely & Security",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`
    },
    {
        title: "Your Bookings",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`
    },
    {
        title: "Your Guide to Paws and Passengers",
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem`
    }
];

class HelpNFAQ extends Component {
    state = {
        activeSections: [],
        FAQData: []
    };
    componentDidMount() {
        this.props.faqRequest();
    }
    componentWillReceiveProps(props) {
        let { data } = props;
        if (!_.isEmpty(data)) {
            let quickHelp = data.quick_help;
            let moreHelp = data.more_help;
            quickHelp[0].sectionTitle = "Quick Help";
            moreHelp[0].sectionTitle = "More Help Topics";
            let merge = [...data.quick_help, ...data.more_help];
            this.setState({ FAQData: merge });
        }
    }

    _renderSectionTitle = section => {
        return (
            <View style={styles.normalPadding}>
                {section.sectionTitle ? (
                    <View style={styles.normalPadding}>
                        <Text color="aztec" size="xSmall" type="medium">
                            {section.sectionTitle}
                        </Text>
                    </View>
                ) : null}
            </View>
        );
    };

    _renderHeader = (section, index, isActive) => {
        return (
            <View style={styles.container}>
                <View style={{ width: 139 }}>
                    <Text color="aztec" size="xxSmall" type="regular">
                        {section.title}
                    </Text>
                </View>
                <View style={{ justifyContent: "center" }}>
                    <Image
                        source={
                            isActive ? Images.expand_less : Images.expand_more
                        }
                    />
                </View>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={{ backgroundColor: Colors.background.primary }}>
                <Separator style={{ opacity: 0.4 }} />
                <Text
                    color="aztec"
                    size="xxSmall"
                    type="regular"
                    style={{ textAlign: "center", lineHeight: 20, padding: 10 }}
                >
                    {section.content}
                </Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };
    render() {
        const { data, isFetching } = this.props;
        const { FAQData } = this.state;
        return (
            <ScrollView
                contentContainerStyle={
                    !data.length && { flexGrow: 1, justifyContent: "center" }
                }
                style={styles.scroll}
            >
                <Accordion
                    sections={FAQData}
                    activeSections={this.state.activeSections}
                    renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                    underlayColor={Colors.background.primary}
                    duration={800}
                />

                <View style={{ marginVertical: 22, marginHorizontal: 5 }}>
                    <Text color="aztec" size="xSmall" type="medium">
                        Contact Us
                    </Text>
                </View>
                <View style={{ width: 222, marginHorizontal: 5 }}>
                    <Text color="aztec" size="xxSmall" type="regular">
                        Have a question, feedback or complaint? Our team will be
                        happy to support you as soon as possible.
                    </Text>
                </View>
                <AppButton
                    icon={Images.mobile_icon}
                    style={{
                        backgroundColor: Colors.appbutton.primary,
                        marginVertical: 24
                    }}
                    buttonTitle="Contact Us"
                    onPress={() =>
                        Utils.openCall(`tel:${data && data.contact_no}`)
                    }
                />
                <Loading loading={isFetching} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    networkInfo: state.networkInfo,
    isFetching: state.faq.isFetching,
    errorMessage: state.faq.errorMessage,
    data: state.faq.data
});

const actions = { faqRequest };

export default connect(
    mapStateToProps,
    actions
)(HelpNFAQ);
