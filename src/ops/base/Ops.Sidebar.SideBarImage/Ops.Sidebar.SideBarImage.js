const
    parentPort = op.inObject("link"),
    filename = op.inUrl("File", [".jpg", ".png", ".webp", ".jpeg", ".avif"]),
    siblingsPort = op.outObject("childs");

const el = document.createElement("div");
el.dataset.op = op.id;
el.classList.add("cablesEle");
el.classList.add("sidebar__item");
el.classList.add("sidebar__text");
const label = document.createElement("div");
label.classList.add("sidebar__item-label");
const labelText = document.createElement("div");// document.createTextNode(filename.get());
label.appendChild(labelText);
el.appendChild(label);

parentPort.onChange = onParentChanged;
filename.onChange = onFilenameChanged;
op.onDelete = onDelete;

op.toWorkNeedsParent("Ops.Sidebar.Sidebar");

function onFilenameChanged()
{
    const fileUrl = filename.get();
    if (!fileUrl) return;
    if (fileUrl.indexOf("/") == 0 || fileUrl.indexOf("http") == 0)
        label.innerHTML = "<img src=\"" + fileUrl + "\" style=\"max-width:100%\">";
    else
        label.innerHTML = "<img src=\"data:image;base64," + fileUrl + "\" style=\"max-width:100%\">";
}

function onParentChanged()
{
    siblingsPort.set(null);
    const parent = parentPort.get();
    if (parent && parent.parentElement)
    {
        parent.parentElement.appendChild(el);
        siblingsPort.set(parent);
    }
    else if (el.parentElement) el.parentElement.removeChild(el);
}

function showElement(el)
{
    if (el) el.style.display = "block";
}

function hideElement(el)
{
    if (el) el.style.display = "none";
}

function onDelete()
{
    removeElementFromDOM(el);
}

function removeElementFromDOM(el)
{
    if (el && el.parentNode && el.parentNode.removeChild) el.parentNode.removeChild(el);
}
