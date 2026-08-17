/* Yourcountant Staff Testing Form — submit via Web3Forms (email delivery) */
(function () {
  'use strict';

  var ACCESS_KEY = 'a85ff556-2a00-4660-87fd-89e12fb5d3b4';

  var SECTIONS = [
    { id: 'partA', letter: 'A', title: 'First Impressions', intro: "Open the app for the first time, or as a new visitor would.", items: [
      "Open the app. Does everything load without errors, and can you read all the text clearly?",
      "If you're asked to set up your shop (shop name, currency), can you finish that in under a minute without getting stuck?",
      "Click stock and Add 5 different stock items with large quantities you want to sell. Example: Millicent rice 50kg, Blue Band Margarine small size, Tin tomatoes medium Size, etc. Can you see them listed correctly?",
      "Click sell and record 2 different sales of the stock items you listed. Did it work well.",
      "Look at the Home screen. Can you tell, at a glance, what today's sales and expenses are?"
    ]},
    { id: 'partB', letter: 'B', title: 'Recording a Sale', intro: "Use real items and prices from your own shop if you can.", items: [
      "Add a new sale for any item and amount. Does it save and show up right away on Home?",
      "Add a sale priced much lower than usual for that item — does the app ask if the price is correct?",
      "Open a sale you just added and change the amount. Does the change save correctly?",
      "Delete a sale. Does it disappear, and does today's total update to match?"
    ]},
    { id: 'partC', letter: 'C', title: 'Recording an Expense', intro: "", items: [
      "Add an expense (for example: Transport, GHS 20). Does it save under Expenses?",
      "Pick a category while adding it — are the categories easy to understand and is your expense easy to find afterward?"
    ]},
    { id: 'partD', letter: 'D', title: 'Stock', intro: "The list of items you sell and how many you have.", items: [
      "Add a new item to your stock with a quantity and a cost price.",
      "Reduce an item's stock, as if you sold or lost some — does the quantity update correctly?",
      "Find an item that is low or out of stock — is that clearly shown, without you having to guess?"
    ]},
    { id: 'partE', letter: 'E', title: 'Debts', intro: "People who owe you money, and people you owe.", items: [
      "Add a new customer who owes you money, with an amount.",
      "Add a person or supplier that you owe money to.",
      "Record a partial payment against one of these debts — does the remaining balance update correctly?",
      "Can you tell, at a glance, who owes you the most money right now?"
    ]},
    { id: 'partF', letter: 'F', title: 'Calculator', intro: "", items: [
      "Open the calculator from the menu. Do all the number and operation buttons respond correctly?",
      "Type a full calculation (for example 25 + 40 − 10) and press equals — is the answer correct?"
    ]},
    { id: 'partG', letter: 'G', title: 'My Bukipa (the AI helper)', intro: "Bukipa is the chat assistant inside the app.", items: [
      "Open “My Bukipa”. Does it greet you and explain what it can help with?",
      "Tell Bukipa, in your own words, that you sold something (for example “I sold 2 bags of sugar for 20 cedis”) — does it understand, and does it ask you to confirm before saving anything?",
      "Tell Bukipa about stock lost or spoiled (for example “3 loaves of bread got spoilt”) — does it correctly remove them from stock?",
      "Ask Bukipa a plain question, like “How much did I make this week?” or “Who owes me money?” — does the answer make sense?",
      "If you can, take a photo of a handwritten sales note or a receipt and send it to Bukipa — does it read it and offer to enter the records for you?"
    ]},
    { id: 'partH', letter: 'H', title: 'History & Reports', intro: "", items: [
      "Open History — can you find a transaction from a specific day without difficulty?",
      "Open Reports — do the sales, expenses and profit figures look right for the period shown?",
      "Try sharing or exporting a report as a PDF — does it produce a file, and is it easy to read?"
    ]},
    { id: 'partI', letter: 'I', title: 'Settings & Your Account', intro: "", items: [
      "Open Settings — can you find and update your shop name and currency?",
      "If cloud backup / sign-in is available, try signing in — does it work, and is all your data still there afterward?",
      "Sign out, then sign back in — is everything still there, nothing missing?"
    ]},
    { id: 'partJ', letter: 'J', title: 'Overall Feel', intro: "", items: [
      "Use the app for a few minutes doing normal shop tasks. Does anything feel slow, confusing, or fragile?",
      "Turn off your internet (or switch to airplane mode), then use the app — does it still work, and does everything sync back once you're online again?"
    ]}
  ];

  var TOTAL_ITEMS = SECTIONS.reduce(function (n, s) { return n + s.items.length; }, 0);
  var state = {};

  var partsEl = document.getElementById('parts');
  if (!partsEl) return;

  SECTIONS.forEach(function (section) {
    var art = document.createElement('section');
    art.className = 'part';
    art.id = section.id;

    var head = document.createElement('div');
    head.className = 'part-head';
    head.innerHTML = '<span class="letter">' + section.letter + '</span><h2>' + section.title + '</h2>';
    art.appendChild(head);

    if (section.intro) {
      var p = document.createElement('p');
      p.className = 'part-intro';
      p.textContent = section.intro;
      art.appendChild(p);
    }

    section.items.forEach(function (question, idx) {
      var key = section.letter + '-' + idx;
      state[key] = { status: null, notes: '' };

      var row = document.createElement('div');
      row.className = 'item';

      var num = document.createElement('div');
      num.className = 'num';
      num.textContent = String(idx + 1);
      row.appendChild(num);

      var body = document.createElement('div');
      body.className = 'item-body';

      var q = document.createElement('p');
      q.className = 'item-q';
      q.textContent = question;
      body.appendChild(q);

      var toggle = document.createElement('div');
      toggle.className = 'toggle';
      var fineBtn = document.createElement('button');
      fineBtn.type = 'button';
      fineBtn.className = 'fine';
      fineBtn.textContent = 'Works fine';
      var problemBtn = document.createElement('button');
      problemBtn.type = 'button';
      problemBtn.className = 'problem';
      problemBtn.textContent = 'Problem';
      toggle.appendChild(fineBtn);
      toggle.appendChild(problemBtn);
      body.appendChild(toggle);

      var notes = document.createElement('input');
      notes.type = 'text';
      notes.className = 'notes';
      notes.placeholder = 'Notes (optional)';
      notes.addEventListener('input', function () { state[key].notes = notes.value; });
      body.appendChild(notes);

      row.appendChild(body);
      art.appendChild(row);

      function setStatus(next) {
        state[key].status = state[key].status === next ? null : next;
        row.classList.remove('fine', 'problem');
        fineBtn.classList.remove('active');
        problemBtn.classList.remove('active');
        if (state[key].status === 'fine') {
          row.classList.add('fine');
          fineBtn.classList.add('active');
        } else if (state[key].status === 'problem') {
          row.classList.add('problem');
          problemBtn.classList.add('active');
          notes.placeholder = 'What happened?';
          notes.focus();
        }
        if (state[key].status !== 'problem') notes.placeholder = 'Notes (optional)';
        updateProgress();
      }
      fineBtn.addEventListener('click', function () { setStatus('fine'); });
      problemBtn.addEventListener('click', function () { setStatus('problem'); });
    });

    partsEl.appendChild(art);
  });

  var progressText = document.getElementById('progressText');
  var progressFill = document.getElementById('progressFill');
  var problemChip = document.getElementById('problemChip');

  function updateProgress() {
    var answered = 0, problems = 0;
    Object.keys(state).forEach(function (k) {
      if (state[k].status) answered++;
      if (state[k].status === 'problem') problems++;
    });
    progressText.textContent = answered + '/' + TOTAL_ITEMS;
    progressFill.style.width = Math.round((answered / TOTAL_ITEMS) * 100) + '%';
    if (problems > 0) {
      problemChip.hidden = false;
      problemChip.textContent = problems + ' problem' + (problems === 1 ? '' : 's');
    } else {
      problemChip.hidden = true;
    }
  }
  updateProgress();

  var ratingGroup = document.getElementById('ratingGroup');
  var ratingLabels = { 1: 'Very hard', 2: '', 3: 'Okay', 4: '', 5: 'Very easy' };
  var rating = null;
  for (var n = 1; n <= 5; n++) {
    (function (n) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.innerHTML = '<span class="n">' + n + '</span><span class="lbl">' + ratingLabels[n] + '</span>';
      btn.addEventListener('click', function () {
        rating = n;
        Array.prototype.forEach.call(ratingGroup.children, function (c) { c.classList.remove('active'); });
        btn.classList.add('active');
      });
      ratingGroup.appendChild(btn);
    })(n);
  }

  var dateInput = document.getElementById('testerDate');
  var today = new Date();
  dateInput.value = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  function buildReport() {
    var name = document.getElementById('testerName').value.trim();
    var device = document.getElementById('testerDevice').value.trim();
    var date = dateInput.value;
    var lines = [];
    lines.push('Tester: ' + (name || '(not given)'));
    lines.push('Device: ' + (device || '(not given)'));
    lines.push('Date: ' + (date || '(not given)'));
    lines.push('');

    SECTIONS.forEach(function (section) {
      lines.push('PART ' + section.letter + ' — ' + section.title.toUpperCase());
      section.items.forEach(function (question, idx) {
        var s = state[section.letter + '-' + idx];
        var status = s.status === 'fine' ? 'Works fine' : s.status === 'problem' ? 'PROBLEM' : 'Not answered';
        lines.push((idx + 1) + '. ' + question);
        lines.push('   Result: ' + status);
        if (s.notes) lines.push('   Notes: ' + s.notes);
      });
      lines.push('');
    });

    lines.push('FEEDBACK');
    lines.push('Confusing/slow/hard to figure out: ' + (document.getElementById('fbConfusing').value.trim() || '(none noted)'));
    lines.push('Broke or unexpected: ' + (document.getElementById('fbBroken').value.trim() || '(none noted)'));
    lines.push('Wishlist: ' + (document.getElementById('fbWish').value.trim() || '(none noted)'));
    lines.push('Overall ease of use: ' + (rating ? rating + '/5' : '(not rated)'));

    return lines.join('\n');
  }

  var form = document.getElementById('yc-form');
  var submitBtn = document.getElementById('submitBtn');
  var submitStatus = document.getElementById('submitStatus');
  var successBox = document.getElementById('successBox');

  function setStatusMsg(msg, cls) {
    submitStatus.textContent = msg;
    submitStatus.className = 'submit-status' + (cls ? ' ' + cls : '');
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: if filled, silently drop the bot but show the success screen
    var hp = form.querySelector('input[name="yc-website"]');
    if (hp && hp.value) {
      form.style.display = 'none';
      successBox.style.display = 'block';
      return;
    }

    var name = val('testerName');
    if (!name) {
      setStatusMsg('Add your name at the top before sending.', 'err');
      document.getElementById('testerName').focus();
      return;
    }

    var answered = 0, problems = 0;
    Object.keys(state).forEach(function (k) {
      if (state[k].status) answered++;
      if (state[k].status === 'problem') problems++;
    });

    submitBtn.disabled = true;
    setStatusMsg('Sending…');

    var date = val('testerDate');
    var data = new FormData();
    data.append('access_key', ACCESS_KEY);
    data.append('from_name', 'Yourcountant — Staff Testing Form');
    data.append('subject', 'Yourcountant test — ' + name + ' — ' + date + ' (' + answered + '/' + TOTAL_ITEMS + ' answered, ' + problems + ' problems)');
    data.append('Tester Name', name);
    data.append('Device', val('testerDevice') || '—');
    data.append('Date', date);
    data.append('Items Answered', answered + '/' + TOTAL_ITEMS);
    data.append('Problems Flagged', String(problems));
    data.append('Full Report', buildReport());

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (!result.success) throw new Error(result.message || 'Submission failed');
        form.style.display = 'none';
        successBox.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(function () {
        setStatusMsg('Something went wrong sending your results. Please try again in a moment.', 'err');
        submitBtn.disabled = false;
      });
  });
})();
