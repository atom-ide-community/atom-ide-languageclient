Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _languageclient = require('../languageclient');

var _convert = require('../convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let LinterAdapter = class LinterAdapter {

  constructor(languageClient) {
    this._diagnosticMap = new Map();

    this._lc = languageClient;
    this._lc.onPublishDiagnostics(this.captureDiagnostics.bind(this));
  }

  captureDiagnostics(params) {
    const path = _convert2.default.uriToPath(params.uri);
    this._diagnosticMap.set(params.uri, params.diagnostics.map(d => LinterAdapter.diagnosticToMessage(path, d)));
  }

  provideDiagnostics() {
    let allResults = [];
    for (let fileResults of this._diagnosticMap.values()) allResults = allResults.concat(fileResults);
    return allResults;
  }

  static diagnosticToMessage(path, diagnostic) {
    return {
      filePath: path,
      text: diagnostic.message,
      range: _convert2.default.lsRangeToAtomRange(diagnostic.range),
      name: diagnostic.source,
      code: diagnostic.code,
      severity: LinterAdapter.diagnosticSeverityToSeverity(diagnostic.severity || -1),
      type: LinterAdapter.diagnosticSeverityToType(diagnostic.severity || -1)
    };
  }

  static diagnosticSeverityToType(severity) {
    switch (severity) {
      case _languageclient.DiagnosticSeverity.Error:
        return 'Error';
      case _languageclient.DiagnosticSeverity.Warning:
        return 'Warning';
      case _languageclient.DiagnosticSeverity.Information:
        return 'Information';
      case _languageclient.DiagnosticSeverity.Hint:
        return 'Hint';
      default:
        return '';
    };
  }

  static diagnosticSeverityToSeverity(severity) {
    switch (severity) {
      case _languageclient.DiagnosticSeverity.Error:
        return 'error';
      case _languageclient.DiagnosticSeverity.Warning:
        return 'warning';
      case _languageclient.DiagnosticSeverity.Information:
      case _languageclient.DiagnosticSeverity.Hint:
      default:
        return 'info';
    }
  }
};
exports.default = LinterAdapter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9hZGFwdGVycy9saW50ZXItYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJMaW50ZXJBZGFwdGVyIiwiY29uc3RydWN0b3IiLCJsYW5ndWFnZUNsaWVudCIsIl9kaWFnbm9zdGljTWFwIiwiTWFwIiwiX2xjIiwib25QdWJsaXNoRGlhZ25vc3RpY3MiLCJjYXB0dXJlRGlhZ25vc3RpY3MiLCJiaW5kIiwicGFyYW1zIiwicGF0aCIsInVyaVRvUGF0aCIsInVyaSIsInNldCIsImRpYWdub3N0aWNzIiwibWFwIiwiZCIsImRpYWdub3N0aWNUb01lc3NhZ2UiLCJwcm92aWRlRGlhZ25vc3RpY3MiLCJhbGxSZXN1bHRzIiwiZmlsZVJlc3VsdHMiLCJ2YWx1ZXMiLCJjb25jYXQiLCJkaWFnbm9zdGljIiwiZmlsZVBhdGgiLCJ0ZXh0IiwibWVzc2FnZSIsInJhbmdlIiwibHNSYW5nZVRvQXRvbVJhbmdlIiwibmFtZSIsInNvdXJjZSIsImNvZGUiLCJzZXZlcml0eSIsImRpYWdub3N0aWNTZXZlcml0eVRvU2V2ZXJpdHkiLCJ0eXBlIiwiZGlhZ25vc3RpY1NldmVyaXR5VG9UeXBlIiwiRXJyb3IiLCJXYXJuaW5nIiwiSW5mb3JtYXRpb24iLCJIaW50Il0sIm1hcHBpbmdzIjoiOzs7OztBQUVBOztBQUVBOzs7Ozs7SUFFcUJBLGEsR0FBTixNQUFNQSxhQUFOLENBQW9COztBQUlqQ0MsY0FBWUMsY0FBWixFQUFzRDtBQUFBLFNBRnREQyxjQUVzRCxHQUZELElBQUlDLEdBQUosRUFFQzs7QUFDcEQsU0FBS0MsR0FBTCxHQUFXSCxjQUFYO0FBQ0EsU0FBS0csR0FBTCxDQUFTQyxvQkFBVCxDQUE4QixLQUFLQyxrQkFBTCxDQUF3QkMsSUFBeEIsQ0FBNkIsSUFBN0IsQ0FBOUI7QUFDRDs7QUFFREQscUJBQW1CRSxNQUFuQixFQUEyRDtBQUN6RCxVQUFNQyxPQUFPLGtCQUFRQyxTQUFSLENBQWtCRixPQUFPRyxHQUF6QixDQUFiO0FBQ0EsU0FBS1QsY0FBTCxDQUFvQlUsR0FBcEIsQ0FBd0JKLE9BQU9HLEdBQS9CLEVBQW9DSCxPQUFPSyxXQUFQLENBQW1CQyxHQUFuQixDQUF1QkMsS0FBS2hCLGNBQWNpQixtQkFBZCxDQUFrQ1AsSUFBbEMsRUFBd0NNLENBQXhDLENBQTVCLENBQXBDO0FBQ0Q7O0FBRURFLHVCQUE0QztBQUMxQyxRQUFJQyxhQUFvQyxFQUF4QztBQUNBLFNBQUssSUFBSUMsV0FBVCxJQUF3QixLQUFLakIsY0FBTCxDQUFvQmtCLE1BQXBCLEVBQXhCLEVBQ0VGLGFBQWFBLFdBQVdHLE1BQVgsQ0FBa0JGLFdBQWxCLENBQWI7QUFDRixXQUFPRCxVQUFQO0FBQ0Q7O0FBRUQsU0FBT0YsbUJBQVAsQ0FBMkJQLElBQTNCLEVBQXlDYSxVQUF6QyxFQUFpRjtBQUMvRSxXQUFPO0FBQ0xDLGdCQUFVZCxJQURMO0FBRUxlLFlBQU1GLFdBQVdHLE9BRlo7QUFHTEMsYUFBTyxrQkFBUUMsa0JBQVIsQ0FBMkJMLFdBQVdJLEtBQXRDLENBSEY7QUFJTEUsWUFBTU4sV0FBV08sTUFKWjtBQUtMQyxZQUFNUixXQUFXUSxJQUxaO0FBTUxDLGdCQUFVaEMsY0FBY2lDLDRCQUFkLENBQTJDVixXQUFXUyxRQUFYLElBQXVCLENBQUMsQ0FBbkUsQ0FOTDtBQU9MRSxZQUFNbEMsY0FBY21DLHdCQUFkLENBQXVDWixXQUFXUyxRQUFYLElBQXVCLENBQUMsQ0FBL0Q7QUFQRCxLQUFQO0FBU0Q7O0FBRUQsU0FBT0csd0JBQVAsQ0FBZ0NILFFBQWhDLEVBQTBEO0FBQ3hELFlBQU9BLFFBQVA7QUFDRSxXQUFLLG1DQUFtQkksS0FBeEI7QUFDRSxlQUFPLE9BQVA7QUFDRixXQUFLLG1DQUFtQkMsT0FBeEI7QUFDRSxlQUFPLFNBQVA7QUFDRixXQUFLLG1DQUFtQkMsV0FBeEI7QUFDRSxlQUFPLGFBQVA7QUFDRixXQUFLLG1DQUFtQkMsSUFBeEI7QUFDRSxlQUFPLE1BQVA7QUFDRjtBQUNFLGVBQU8sRUFBUDtBQVZKLEtBV0M7QUFDRjs7QUFFRCxTQUFPTiw0QkFBUCxDQUFvQ0QsUUFBcEMsRUFBb0Y7QUFDbEYsWUFBT0EsUUFBUDtBQUNFLFdBQUssbUNBQW1CSSxLQUF4QjtBQUNFLGVBQU8sT0FBUDtBQUNGLFdBQUssbUNBQW1CQyxPQUF4QjtBQUNFLGVBQU8sU0FBUDtBQUNGLFdBQUssbUNBQW1CQyxXQUF4QjtBQUNBLFdBQUssbUNBQW1CQyxJQUF4QjtBQUNBO0FBQ0UsZUFBTyxNQUFQO0FBUko7QUFVRDtBQTNEZ0MsQztrQkFBZHZDLGEiLCJmaWxlIjoibGludGVyLWFkYXB0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAZmxvd1xuXG5pbXBvcnQge0xhbmd1YWdlQ2xpZW50Q29ubmVjdGlvbiwgRGlhZ25vc3RpY1NldmVyaXR5fSBmcm9tICcuLi9sYW5ndWFnZWNsaWVudCc7XG5pbXBvcnQgdHlwZSB7RGlhZ25vc3RpYywgUHVibGlzaERpYWdub3N0aWNzUGFyYW1zfSBmcm9tICcuLi9sYW5ndWFnZWNsaWVudCc7XG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb252ZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGludGVyQWRhcHRlciB7XG4gIF9sYzogTGFuZ3VhZ2VDbGllbnRDb25uZWN0aW9uO1xuICBfZGlhZ25vc3RpY01hcDogTWFwPHN0cmluZywgQXJyYXk8bGludGVyJE1lc3NhZ2U+PiA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihsYW5ndWFnZUNsaWVudDogTGFuZ3VhZ2VDbGllbnRDb25uZWN0aW9uKSB7XG4gICAgdGhpcy5fbGMgPSBsYW5ndWFnZUNsaWVudDtcbiAgICB0aGlzLl9sYy5vblB1Ymxpc2hEaWFnbm9zdGljcyh0aGlzLmNhcHR1cmVEaWFnbm9zdGljcy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIGNhcHR1cmVEaWFnbm9zdGljcyhwYXJhbXM6IFB1Ymxpc2hEaWFnbm9zdGljc1BhcmFtcyk6IHZvaWQge1xuICAgIGNvbnN0IHBhdGggPSBDb252ZXJ0LnVyaVRvUGF0aChwYXJhbXMudXJpKTtcbiAgICB0aGlzLl9kaWFnbm9zdGljTWFwLnNldChwYXJhbXMudXJpLCBwYXJhbXMuZGlhZ25vc3RpY3MubWFwKGQgPT4gTGludGVyQWRhcHRlci5kaWFnbm9zdGljVG9NZXNzYWdlKHBhdGgsIGQpKSk7XG4gIH1cblxuICBwcm92aWRlRGlhZ25vc3RpY3MoKTogQXJyYXk8bGludGVyJE1lc3NhZ2U+IHtcbiAgICBsZXQgYWxsUmVzdWx0czogQXJyYXk8bGludGVyJE1lc3NhZ2U+ID0gW107XG4gICAgZm9yIChsZXQgZmlsZVJlc3VsdHMgb2YgdGhpcy5fZGlhZ25vc3RpY01hcC52YWx1ZXMoKSlcbiAgICAgIGFsbFJlc3VsdHMgPSBhbGxSZXN1bHRzLmNvbmNhdChmaWxlUmVzdWx0cyk7XG4gICAgcmV0dXJuIGFsbFJlc3VsdHM7XG4gIH1cblxuICBzdGF0aWMgZGlhZ25vc3RpY1RvTWVzc2FnZShwYXRoOiBzdHJpbmcsIGRpYWdub3N0aWM6IERpYWdub3N0aWMpOiBsaW50ZXIkTWVzc2FnZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbGVQYXRoOiBwYXRoLFxuICAgICAgdGV4dDogZGlhZ25vc3RpYy5tZXNzYWdlLFxuICAgICAgcmFuZ2U6IENvbnZlcnQubHNSYW5nZVRvQXRvbVJhbmdlKGRpYWdub3N0aWMucmFuZ2UpLFxuICAgICAgbmFtZTogZGlhZ25vc3RpYy5zb3VyY2UsXG4gICAgICBjb2RlOiBkaWFnbm9zdGljLmNvZGUsXG4gICAgICBzZXZlcml0eTogTGludGVyQWRhcHRlci5kaWFnbm9zdGljU2V2ZXJpdHlUb1NldmVyaXR5KGRpYWdub3N0aWMuc2V2ZXJpdHkgfHwgLTEpLFxuICAgICAgdHlwZTogTGludGVyQWRhcHRlci5kaWFnbm9zdGljU2V2ZXJpdHlUb1R5cGUoZGlhZ25vc3RpYy5zZXZlcml0eSB8fCAtMSksXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBkaWFnbm9zdGljU2V2ZXJpdHlUb1R5cGUoc2V2ZXJpdHk6IG51bWJlcik6IHN0cmluZyB7XG4gICAgc3dpdGNoKHNldmVyaXR5KSB7XG4gICAgICBjYXNlIERpYWdub3N0aWNTZXZlcml0eS5FcnJvcjpcbiAgICAgICAgcmV0dXJuICdFcnJvcic7XG4gICAgICBjYXNlIERpYWdub3N0aWNTZXZlcml0eS5XYXJuaW5nOlxuICAgICAgICByZXR1cm4gJ1dhcm5pbmcnO1xuICAgICAgY2FzZSBEaWFnbm9zdGljU2V2ZXJpdHkuSW5mb3JtYXRpb246XG4gICAgICAgIHJldHVybiAnSW5mb3JtYXRpb24nO1xuICAgICAgY2FzZSBEaWFnbm9zdGljU2V2ZXJpdHkuSGludDpcbiAgICAgICAgcmV0dXJuICdIaW50JztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGRpYWdub3N0aWNTZXZlcml0eVRvU2V2ZXJpdHkoc2V2ZXJpdHk6IG51bWJlcik6ICdlcnJvcicgfCAnd2FybmluZycgfCAnaW5mbycge1xuICAgIHN3aXRjaChzZXZlcml0eSkge1xuICAgICAgY2FzZSBEaWFnbm9zdGljU2V2ZXJpdHkuRXJyb3I6XG4gICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgY2FzZSBEaWFnbm9zdGljU2V2ZXJpdHkuV2FybmluZzpcbiAgICAgICAgcmV0dXJuICd3YXJuaW5nJztcbiAgICAgIGNhc2UgRGlhZ25vc3RpY1NldmVyaXR5LkluZm9ybWF0aW9uOlxuICAgICAgY2FzZSBEaWFnbm9zdGljU2V2ZXJpdHkuSGludDpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiAnaW5mbyc7XG4gICAgfVxuICB9XG59XG4iXX0=