// NOTE: Because it's late.
// http://stackoverflow.com/a/4489601/4459911
function replaceText(node, text, replacementNodeTemplate) {
  if (node.nodeType == 3) {
    while (node) {
      var textIndex = node.data.indexOf(text), currentNode = node;
      if (textIndex == -1) {
        node = null;
      } else {
        // Split the text node after the text
        var splitIndex = textIndex + text.length;
        var replacementNode = replacementNodeTemplate.cloneNode(true);
        if (splitIndex < node.length) {
          node = node.splitText(textIndex + text.length);
          node.parentNode.insertBefore(replacementNode, node);
        } else {
          node.parentNode.appendChild(replacementNode);
          node = null;
        }
        currentNode.deleteData(textIndex, text.length);
      }
    }
  } else {
    var child = node.firstChild, nextChild;
    while (child) {
      nextChild = child.nextSibling;
      replaceText(child, text, replacementNodeTemplate);
      child = nextChild;
    }
  }
}

const memberBerryPurple = 'purple'

let a = document.createElement('span')
a.style.color = memberBerryPurple
a.innerText = 'member'

let b = document.createElement('span')
b.style.color = memberBerryPurple
b.innerText = 'Member'


var target = document.body
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    replaceText(document.body, 'remember', a)
    replaceText(document.body, 'Remember', b)
  })
})

var config = { attributes: false, childList: true, characterData: true, subtree: true }

observer.observe(target, config)

window.addEventListener('unload', function () {
  observer.disconnect()
})
