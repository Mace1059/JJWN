function createElement(type, mclass, mid, mcontent) {
    const e = document.createElement('div');
    document.body.appendChild(e);
    e.textContent = mcontent;
    e.setAttribute('class', mclass);
    e.setAttribute("id", mid);
    console.log(type, mclass, mid, mcontent)
}
createElement('div', 'matchupBox', 'mb1', 'Fuck you pussy1')
createElement('div', 'matchupBox', 'mb2', 'Fuck you pussy2')

