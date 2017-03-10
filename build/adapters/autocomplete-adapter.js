Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _languageclient = require('../languageclient');

var _convert = require('../convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

let AutocompleteAdapter = class AutocompleteAdapter {

  constructor(languageClient) {
    this._lc = languageClient;
  }

  getSuggestions(request) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const completionItems = yield _this._lc.completion({
        textDocument: _convert2.default.editorToTextDocumentIdentifier(request.editor),
        position: _convert2.default.pointToPosition(request.bufferPosition)
      });
      return AutocompleteAdapter.completionItemsToSuggestions(completionItems, request);
    })();
  }

  static completionItemsToSuggestions(completionItems, request) {
    return (Array.isArray(completionItems) ? completionItems : completionItems.items || []).map(s => AutocompleteAdapter.completionItemToSuggestion(s, request));
  }

  static completionItemToSuggestion(item, request) {
    let suggestion = {
      text: item.insertText || item.label,
      displayText: item.label,
      filterText: item.filterText || item.label,
      type: AutocompleteAdapter.completionKindToSuggestionType(item.kind),
      description: item.detail,
      descriptionMoreURL: item.documentation
    };

    if (item.textEdit) {
      const { range, newText } = item.textEdit;
      suggestion.replacementPrefix = request.editor.getTextInBufferRange(_convert2.default.lsRangeToAtomRange(range));
      suggestion.text = newText;
    }

    // TODO: Snippets
    return suggestion;
  }

  static completionKindToSuggestionType(kind) {
    switch (kind) {
      case _languageclient.CompletionItemKind.Method:
        return 'method';
      case _languageclient.CompletionItemKind.Function:
      case _languageclient.CompletionItemKind.Constructor:
        return 'function';
      case _languageclient.CompletionItemKind.Field:
      case _languageclient.CompletionItemKind.Property:
        return 'property';
      case _languageclient.CompletionItemKind.Variable:
        return 'variable';
      case _languageclient.CompletionItemKind.Class:
        return 'class';
      case _languageclient.CompletionItemKind.Interface:
        return 'interface';
      case _languageclient.CompletionItemKind.Module:
        return 'module';
      case _languageclient.CompletionItemKind.Unit:
        return 'builtin';
      case _languageclient.CompletionItemKind.Enum:
        return 'enum';
      case _languageclient.CompletionItemKind.Keyword:
        return 'keyword';
      case _languageclient.CompletionItemKind.Snippet:
        return 'snippet';
      case _languageclient.CompletionItemKind.File:
        return 'import';
      case _languageclient.CompletionItemKind.Reference:
        return 'require';
      default:
        return 'value';
    }
  }
};
exports.default = AutocompleteAdapter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9hZGFwdGVycy9hdXRvY29tcGxldGUtYWRhcHRlci5qcyJdLCJuYW1lcyI6WyJBdXRvY29tcGxldGVBZGFwdGVyIiwiY29uc3RydWN0b3IiLCJsYW5ndWFnZUNsaWVudCIsIl9sYyIsImdldFN1Z2dlc3Rpb25zIiwicmVxdWVzdCIsImNvbXBsZXRpb25JdGVtcyIsImNvbXBsZXRpb24iLCJ0ZXh0RG9jdW1lbnQiLCJlZGl0b3JUb1RleHREb2N1bWVudElkZW50aWZpZXIiLCJlZGl0b3IiLCJwb3NpdGlvbiIsInBvaW50VG9Qb3NpdGlvbiIsImJ1ZmZlclBvc2l0aW9uIiwiY29tcGxldGlvbkl0ZW1zVG9TdWdnZXN0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsIml0ZW1zIiwibWFwIiwicyIsImNvbXBsZXRpb25JdGVtVG9TdWdnZXN0aW9uIiwiaXRlbSIsInN1Z2dlc3Rpb24iLCJ0ZXh0IiwiaW5zZXJ0VGV4dCIsImxhYmVsIiwiZGlzcGxheVRleHQiLCJmaWx0ZXJUZXh0IiwidHlwZSIsImNvbXBsZXRpb25LaW5kVG9TdWdnZXN0aW9uVHlwZSIsImtpbmQiLCJkZXNjcmlwdGlvbiIsImRldGFpbCIsImRlc2NyaXB0aW9uTW9yZVVSTCIsImRvY3VtZW50YXRpb24iLCJ0ZXh0RWRpdCIsInJhbmdlIiwibmV3VGV4dCIsInJlcGxhY2VtZW50UHJlZml4IiwiZ2V0VGV4dEluQnVmZmVyUmFuZ2UiLCJsc1JhbmdlVG9BdG9tUmFuZ2UiLCJNZXRob2QiLCJGdW5jdGlvbiIsIkNvbnN0cnVjdG9yIiwiRmllbGQiLCJQcm9wZXJ0eSIsIlZhcmlhYmxlIiwiQ2xhc3MiLCJJbnRlcmZhY2UiLCJNb2R1bGUiLCJVbml0IiwiRW51bSIsIktleXdvcmQiLCJTbmlwcGV0IiwiRmlsZSIsIlJlZmVyZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQTs7QUFFQTs7Ozs7Ozs7SUFFcUJBLG1CLEdBQU4sTUFBTUEsbUJBQU4sQ0FBMEI7O0FBR3ZDQyxjQUFZQyxj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bXBvcnQge0xhbmd1YWdlQ2xpZW50Q29ubmVjdGlvbiwgQ29tcGxldGlvbkl0ZW1LaW5kfSBmcm9tICcuLi9sYW5ndWFnZWNsaWVudCc7XG5pbXBvcnQgdHlwZSB7Q29tcGxldGlvbkl0ZW0sIENvbXBsZXRpb25MaXN0fSBmcm9tICcuLi9sYW5ndWFnZWNsaWVudCc7XG5pbXBvcnQgQ29udmVydCBmcm9tICcuLi9jb252ZXJ0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXV0b2NvbXBsZXRlQWRhcHRlciB7XG4gIF9sYzogTGFuZ3VhZ2VDbGllbnRDb25uZWN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKGxhbmd1YWdlQ2xpZW50OiBMYW5ndWFnZUNsaWVudENvbm5lY3Rpb24pIHtcbiAgICB0aGlzLl9sYyA9IGxhbmd1YWdlQ2xpZW50O1xuICB9XG5cbiAgYXN5bmMgZ2V0U3VnZ2VzdGlvbnMocmVxdWVzdDogYXRvbSRBdXRvY29tcGxldGVSZXF1ZXN0KTogUHJvbWlzZTxBcnJheTxhdG9tJEF1dG9jb21wbGV0ZVN1Z2dlc3Rpb24+PiB7XG4gICAgY29uc3QgY29tcGxldGlvbkl0ZW1zID0gYXdhaXQgdGhpcy5fbGMuY29tcGxldGlvbih7XG4gICAgICB0ZXh0RG9jdW1lbnQ6IENvbnZlcnQuZWRpdG9yVG9UZXh0RG9jdW1lbnRJZGVudGlmaWVyKHJlcXVlc3QuZWRpdG9yKSxcbiAgICAgIHBvc2l0aW9uOiBDb252ZXJ0LnBvaW50VG9Qb3NpdGlvbihyZXF1ZXN0LmJ1ZmZlclBvc2l0aW9uKVxuICAgIH0pO1xuICAgIHJldHVybiBBdXRvY29tcGxldGVBZGFwdGVyLmNvbXBsZXRpb25JdGVtc1RvU3VnZ2VzdGlvbnMoY29tcGxldGlvbkl0ZW1zLCByZXF1ZXN0KTtcbiAgfVxuXG4gIHN0YXRpYyBjb21wbGV0aW9uSXRlbXNUb1N1Z2dlc3Rpb25zKGNvbXBsZXRpb25JdGVtczogQXJyYXk8Q29tcGxldGlvbkl0ZW0+IHwgQ29tcGxldGlvbkxpc3QsIHJlcXVlc3Q6IGF0b20kQXV0b2NvbXBsZXRlUmVxdWVzdCk6IEFycmF5PGF0b20kQXV0b2NvbXBsZXRlU3VnZ2VzdGlvbj4ge1xuICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShjb21wbGV0aW9uSXRlbXMpID8gY29tcGxldGlvbkl0ZW1zIDogY29tcGxldGlvbkl0ZW1zLml0ZW1zIHx8IFtdKVxuICAgICAgLm1hcChzID0+IEF1dG9jb21wbGV0ZUFkYXB0ZXIuY29tcGxldGlvbkl0ZW1Ub1N1Z2dlc3Rpb24ocywgcmVxdWVzdCkpO1xuICB9XG5cbiAgc3RhdGljIGNvbXBsZXRpb25JdGVtVG9TdWdnZXN0aW9uKGl0ZW06IENvbXBsZXRpb25JdGVtLCByZXF1ZXN0OiBhdG9tJEF1dG9jb21wbGV0ZVJlcXVlc3QpOiBhdG9tJEF1dG9jb21wbGV0ZVN1Z2dlc3Rpb24ge1xuICAgIGxldCBzdWdnZXN0aW9uOiBhdG9tJEF1dG9jb21wbGV0ZVN1Z2dlc3Rpb24gPSB7XG4gICAgICB0ZXh0OiBpdGVtLmluc2VydFRleHQgfHwgaXRlbS5sYWJlbCxcbiAgICAgIGRpc3BsYXlUZXh0OiBpdGVtLmxhYmVsLFxuICAgICAgZmlsdGVyVGV4dDogaXRlbS5maWx0ZXJUZXh0IHx8IGl0ZW0ubGFiZWwsXG4gICAgICB0eXBlOiBBdXRvY29tcGxldGVBZGFwdGVyLmNvbXBsZXRpb25LaW5kVG9TdWdnZXN0aW9uVHlwZShpdGVtLmtpbmQpLFxuICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGV0YWlsLFxuICAgICAgZGVzY3JpcHRpb25Nb3JlVVJMOiBpdGVtLmRvY3VtZW50YXRpb24sXG4gICAgfTtcblxuICAgIGlmIChpdGVtLnRleHRFZGl0KSB7XG4gICAgICBjb25zdCB7cmFuZ2UsIG5ld1RleHR9ID0gaXRlbS50ZXh0RWRpdDtcbiAgICAgIHN1Z2dlc3Rpb24ucmVwbGFjZW1lbnRQcmVmaXggPSByZXF1ZXN0LmVkaXRvci5nZXRUZXh0SW5CdWZmZXJSYW5nZShDb252ZXJ0LmxzUmFuZ2VUb0F0b21SYW5nZShyYW5nZSkpO1xuICAgICAgc3VnZ2VzdGlvbi50ZXh0ID0gbmV3VGV4dDtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBTbmlwcGV0c1xuICAgIHJldHVybiBzdWdnZXN0aW9uO1xuICB9XG5cbiAgc3RhdGljIGNvbXBsZXRpb25LaW5kVG9TdWdnZXN0aW9uVHlwZShraW5kOiA/bnVtYmVyKTogc3RyaW5nIHtcbiAgICBzd2l0Y2goa2luZCkge1xuICAgICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuTWV0aG9kOlxuICAgICAgICByZXR1cm4gJ21ldGhvZCc7XG4gICAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5GdW5jdGlvbjpcbiAgICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLkNvbnN0cnVjdG9yOlxuICAgICAgICByZXR1cm4gJ2Z1bmN0aW9uJztcbiAgICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLkZpZWxkOlxuICAgICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuUHJvcGVydHk6XG4gICAgICAgIHJldHVybiAncHJvcGVydHknO1xuICAgICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuVmFyaWFibGU6XG4gICAgICAgIHJldHVybiAndmFyaWFibGUnO1xuICAgICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuQ2xhc3M6XG4gICAgICAgIHJldHVybiAnY2xhc3MnO1xuICAgICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuSW50ZXJmYWNlOlxuICAgICAgICByZXR1cm4gJ2ludGVyZmFjZSc7XG4gICAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5Nb2R1bGU6XG4gICAgICAgIHJldHVybiAnbW9kdWxlJztcbiAgICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLlVuaXQ6XG4gICAgICAgIHJldHVybiAnYnVpbHRpbic7XG4gICAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5FbnVtOlxuICAgICAgICByZXR1cm4gJ2VudW0nO1xuICAgICAgY2FzZSBDb21wbGV0aW9uSXRlbUtpbmQuS2V5d29yZDpcbiAgICAgICAgcmV0dXJuICdrZXl3b3JkJztcbiAgICAgIGNhc2UgQ29tcGxldGlvbkl0ZW1LaW5kLlNuaXBwZXQ6XG4gICAgICAgIHJldHVybiAnc25pcHBldCc7XG4gICAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5GaWxlOlxuICAgICAgICByZXR1cm4gJ2ltcG9ydCc7XG4gICAgICBjYXNlIENvbXBsZXRpb25JdGVtS2luZC5SZWZlcmVuY2U6XG4gICAgICAgIHJldHVybiAncmVxdWlyZSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ3ZhbHVlJztcbiAgICB9XG4gIH1cbn1cbiJdfQ==