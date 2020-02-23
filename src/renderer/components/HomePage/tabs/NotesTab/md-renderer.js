import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

var defaultRender =
  md.renderer.rules.heading_open ||
  function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  console.log("Header open rule");
  const token = tokens[idx];
  const classIndex = token.attrIndex("class");
  const cl = getClass(token);

  // get the class

  if (classIndex < 0) {
    tokens[idx].attrPush(["class", cl]);
  } else {
    tokens[idx].attrs[classIndex][1] = cl;
  }

  const r = defaultRender(tokens, idx, options, env, self);
  return r;
};

md.renderer.rules.heading_close = (tokens, idx, options, env, self) => {
  if (tokens[idx].tag === "h1") {
    return (
      self.renderToken(tokens, idx, options) +
      '<hr class="has-background-white-bis" />'
    );
  }
  return self.renderToken(tokens, idx, options);
};

const getClass = token => {
  switch (token.tag) {
    case "h1":
      return "is-size-1 has-text-weight-bold";

    case "h2":
      return "is-size-2 has-text-weight-bold";

    case "h3":
      return "is-size-3 has-text-weight-bold";

    default:
      return "has-text-weight-bold";
  }
};
export default md;
