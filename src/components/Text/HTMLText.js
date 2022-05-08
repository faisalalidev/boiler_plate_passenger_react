import React from "react";
import parse5 from "parse5";
import { StyleSheet, Text, View } from "react-native";
import { Fonts, Colors, Metrics } from "../../theme";

const BLOCK_ELEMENTS = [
  "blockquote",
  "div",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "ol",
  "p",
  "pre",
  "ul",
  "li"
];

const INLINE_ELEMENTS = [
  "b",
  "i",
  "em",
  "strong",
  "a",
  "br",
  "q",
  "span",
  "sub",
  "sup"
];

const DEFAULT_STYLES = StyleSheet.create({
  a: {},
  b: {
    color: Colors.text.secondary
    // fontFamily: Fonts.style.medium
  },
  blockquote: {
    // paddingLeft: 12,
    // borderLeftWidth: 4,
    // borderLeftColor: '#cccccc',
    // marginBottom: 12
  },
  br: {},
  div: {},
  em: {
    //fontFamily: Fonts.style.medium
  },
  h1: {
    //fontFamily: Fonts.style.medium,
  },
  h2: {
    //fontFamily: Fonts.style.medium,
  },
  h3: {
    //fontFamily: Fonts.style.medium,
  },
  h4: {
    //fontFamily: Fonts.style.medium,
  },
  h5: {
    //fontFamily: Fonts.style.medium,
  },
  h6: {
    //fontFamily: Fonts.style.medium,
  },
  i: {
    //fontStyle: 'italic'
  },
  p: {
    //marginBottom: 12,
  },
  pre: {},
  strong: {
    //fontFamily: Fonts.style.medium
  },
  q: {},
  span: {},
  sub: {},
  sup: {},
  ol: {
    //marginLeft: 24,
  },
  ul: {
    //marginLeft: 24,
  },
  default: {
    FontSize: Fonts.size.normal,
    color: Colors.text.primary,
    fontFamily: Fonts.style.base
  }
});

function isText(tagName): Boolean {
  return tagName === "#text";
}

function isBlockElement(tagName): Boolean {
  return BLOCK_ELEMENTS.indexOf(tagName) !== -1;
}

function isInlineElement(tagName): Boolean {
  return INLINE_ELEMENTS.indexOf(tagName) !== -1;
}

function styleForTag(tagName) {
  return DEFAULT_STYLES[tagName]
    ? DEFAULT_STYLES[tagName]
    : DEFAULT_STYLES["default"];
}

function processNode(node, parentKey) {
  var nodeName = node.nodeName;

  if (isText(nodeName)) {
    var key = `${parentKey}_text`;
    return <Text key={key}>{node.value}</Text>;
  }

  if (isInlineElement(nodeName)) {
    var key = `${parentKey}_${nodeName}`;
    var children = [];
    node.childNodes.forEach((child, index) => {
      if (isInlineElement(child.nodeName) || isText(child.nodeName)) {
        children.push(processNode(child, `${key}_${index}`));
      } else {
        console.error(
          `Inline element ${nodeName} can only have inline children, ${child} is invalid!`
        );
      }
    });
    return (
      <Text key={key} style={styleForTag(nodeName)}>
        {children}
      </Text>
    );
  }

  if (isBlockElement(nodeName)) {
    var key = `${parentKey}_${nodeName}`;
    var children = [];
    var lastInlineNodes = [];

    node.childNodes.forEach((childNode, index) => {
      var child = processNode(childNode, `${key}_${index}`);
      if (isInlineElement(childNode.nodeName) || isText(childNode.nodeName)) {
        lastInlineNodes.push(child);
      } else if (isBlockElement(childNode.nodeName)) {
        if (lastInlineNodes.length > 0) {
          children.push(
            <Text key={`${key}_${index}_inline`}>{lastInlineNodes}</Text>
          );
          lastInlineNodes = [];
        }
        children.push(child);
      }
    });

    if (lastInlineNodes.length > 0) {
      children.push(<Text key={`${key}_last_inline`}>{lastInlineNodes}</Text>);
    }
    return (
      <View key={key} style={styleForTag(nodeName)}>
        {children}
      </View>
    );
  }

  console.warn(`unsupported node: ${nodeName}`);
  return null;
}

class HtmlText extends React.Component {
  parse(html) {
    var parser = new parse5.Parser();
    var fragment = parser.parseFragment(html);
    return fragment;
  }

  render() {
    var html = this.props.html;
    var fragment = this.parse(html);
    var rootKey = "ht_";

    var children = [];
    fragment.childNodes.forEach((node, index) => {
      children.push(processNode(node, `${rootKey}_${index}`));
    });

    console.log(children);
    return <View style={this.props.style}>{children}</View>;
  }
}

module.exports = HtmlText;
