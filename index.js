/**
 *
 * @param {object} options:
 * - contextFilePath: path to save the context file within the distribution dir, by default "netlify-context.json".
 * - enabledFor: array with context names the recorder is enabled for, by default ["deploy-preview", "branch-deploy"]
 * @constructor
 */
function NetlifyContextRecorder(options) {
  this.options = options || {};
  this.contextFilePath = this.options.contextFilePath || "netlify-context.json";
  this.enabledFor = this.options.enabledFor || ["deploy-preview", "branch-deploy"];
}

NetlifyContextRecorder.prototype.apply = function(compiler) {
  if (this.enabledFor.includes(process.env["CONTEXT"])) {
    var path = this.contextFilePath;
    compiler.plugin('emit', function(compilation, callback) {
      saveContext(compilation, path);
      callback();
    });
  }
};

function saveContext(compilation, path) {
  var ctx = {
    "context": process.env["CONTEXT"],
    "headBranch": process.env["HEAD"] || "master",
    "commitRef": process.env["COMMIT_REF"],
    "repository": process.env["REPOSITORY"],
    "deployUrl": process.env["PRIME_DEPLOY_URL"],
    "reviewId": process.env["REVIEW_ID"]
  };

  var jsonCtx = JSON.stringify(ctx);
  compilation.assets[path] = {
    source: function() {
      return jsonCtx;
    },
    size: function() {
      return jsonCtx.length;
    }
  };
}

module.exports = NetlifyContextRecorder;
