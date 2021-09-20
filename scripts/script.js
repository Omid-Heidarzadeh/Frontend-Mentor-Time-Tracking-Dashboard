import getTrackingData from './AjaxRequest.js';

let trackingData = '';
let url = 'assets/json/data.json';
let priods = document.querySelector('.profile__period');
for (let child of priods.children)
  child.addEventListener('click', priodSelectHandler);

async function priodSelectHandler(e) {
  await getTrackingData(url).then((res) => (trackingData = res));

  if (!trackingData)
    throw new Error('Something goes wrong when retreiving data from server');
  else {
    document
      .querySelector('.profile__period .active')
      .classList.toggle('active', false);

    e.target.classList.toggle('active', true);

    let period = e.target.dataset.period;
    updateWidgets(period);
  }
}

function updateWidgets(period) {
  let map = { daily: 'day', weekly: 'week', monthly: 'month' };
  for (let field of trackingData) {
    let title = field.title.replace(' ', ''); //remove space in titles like "Self Care"
    let crnt = document.querySelector('#current' + CSS.escape(title));
    let prev = document.querySelector('#previous' + CSS.escape(title));
    crnt.textContent = `${field.timeframes[period].current}hrs`;
    prev.textContent = `${map[period]} - ${field.timeframes[period].previous} hrs`;
  }
}

getTrackingData(url).then(
  (res) => ((trackingData = res), updateWidgets('daily'))
);
