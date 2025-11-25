
  // Helpers
  const $ = sel => document.querySelector(sel);
  const $all = sel => Array.from(document.querySelectorAll(sel));
  const formatINR = n => '₹' + Number(n).toFixed(2);

  // Flight & extras data (expanded)
  const flights = [
    {id:'AI101', from:'Delhi - Indira Gandhi (DEL)', to:'Mumbai - Chhatrapati Shivaji (BOM)', dep:'06:30', dur:'2h 10m', seats:40, price:4200},
    {id:'AI102', from:'Delhi - Indira Gandhi (DEL)', to:'Bengaluru - Kempegowda (BLR)', dep:'09:00', dur:'2h 45m', seats:35, price:4700},
    {id:'AI103', from:'Mumbai - BOM (BOM)', to:'London - Heathrow (LHR)', dep:'22:30', dur:'9h 30m', seats:18, price:56000},
    {id:'AI104', from:'Delhi - DEL (DEL)', to:'Dubai - DXB (DXB)', dep:'03:45', dur:'3h 50m', seats:30, price:18500},
    {id:'AI105', from:'Chennai - MAA (MAA)', to:'Singapore - SIN (SIN)', dep:'01:20', dur:'5h 10m', seats:25, price:25500},
    {id:'AI106', from:'Kolkata - CCU (CCU)', to:'Bangkok - BKK (BKK)', dep:'07:10', dur:'3h 00m', seats:28, price:15000},
    {id:'AI107', from:'Hyderabad - HYD (HYD)', to:'Kuala Lumpur - KUL (KUL)', dep:'12:00', dur:'5h 15m', seats:22, price:24000},
    {id:'AI108', from:'Goa - GOI (GOI)', to:'Mumbai - BOM (BOM)', dep:'16:30', dur:'1h 05m', seats:45, price:3800},
    {id:'AI109', from:'Ahmedabad - AMD (AMD)', to:'Delhi - DEL (DEL)', dep:'06:10', dur:'1h 45m', seats:40, price:3600},
    {id:'AI110', from:'Pune - PNQ (PNQ)', to:'Mumbai - BOM (BOM)', dep:'08:20', dur:'1h 00m', seats:42, price:3200}
  ];

  const extrasCatalog = [
    {id:'E01',name:'Veg Thali (Indian)',price:250},{id:'E02',name:'Paneer Butter Masala',price:220},
    {id:'E03',name:'Aloo Paratha + Yogurt',price:180},{id:'E04',name:'Masala Dosa',price:200},
    {id:'E05',name:'Veg Biryani',price:240},{id:'E06',name:'Chole Bhature',price:220},
    {id:'E07',name:'Idli + Sambar',price:160},{id:'E08',name:'Vada Pav',price:140},
    {id:'E09',name:'Sandwich (Veg)',price:150},{id:'E10',name:'Fruit Salad',price:120},
    {id:'E11',name:'Samosa (2 pcs)',price:80},{id:'E12',name:'Kachori',price:70},{id:'E13',name:'Pav Bhaji',price:190},
    {id:'E14',name:'Eggless Dessert (Gulab Jamun)',price:100},{id:'E15',name:'Coffee',price:80},{id:'E16',name:'Tea',price:50},
    {id:'E17',name:'Fresh Juice',price:120},{id:'E18',name:'Mineral Water',price:40},{id:'E19',name:'Soda',price:60},
    {id:'E20',name:'Dry Fruits Snack',price:180}
  ];

  // Init UI
  function initUI(){
    $('#miniAvailability').innerHTML = flights.map(f => `<div class="py-1">${f.id} • ${f.from.split(' - ')[0]} → ${f.to.split(' - ')[0]} (${f.seats} seats)</div>`).join('');
    $('#extrasList').innerHTML = extrasCatalog.map(x => `<div class="d-flex align-items-center gap-2"><div class="form-check"><input class="form-check-input extra-checkbox" type="checkbox" id="ex_${x.id}" data-id="${x.id}" data-name="${x.name}" data-price="${x.price}"></div><label class="form-check-label" for="ex_${x.id}">${x.name} — ${formatINR(x.price)}</label></div>`).join('');
    renderFlightsInitial();
    renderBookings();
  }

  function renderFlightsInitial(){
    const grid = $('#flightsGrid'); grid.innerHTML = '';
    flights.slice(0,6).forEach(f => grid.appendChild(createFlightCard(f,1)));
    $('#searchResults').style.display = 'block';
  }

  function createFlightCard(f,passengers){
    const col = document.createElement('div'); col.className='col-12 col-md-6';
    col.innerHTML = `<div class="card h-100"><div class="card-body d-flex flex-column justify-content-between">
      <div><div class="d-flex justify-content-between"><div><h6>${f.from.split(' - ')[0]} → ${f.to.split(' - ')[0]}</h6><div class="muted">${f.from} → ${f.to}</div></div><div class="text-end"><div class="h5">${formatINR(f.price)}</div><div class="muted small">${f.dep} • ${f.dur}</div></div></div></div>
      <div class="mt-3 d-flex justify-content-between align-items-center"><div class="muted small">Seats: ${f.seats}</div><div><button class="btn btn-sm btn-primary select-flight" data-id="${f.id}" data-pass="${passengers}">Select</button></div></div>
      </div></div>`;
    return col;
  }

  // Search handler
  $('#searchForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const from = $('#fromAirport').value || '';
    const to = $('#toAirport').value || '';
    const pass = Number($('#passengers').value) || 1;
    const grid = $('#flightsGrid'); grid.innerHTML = '';
    const results = flights.filter(f => (from? f.from.toLowerCase().includes(from.toLowerCase()): true) && (to? f.to.toLowerCase().includes(to.toLowerCase()): true));
    if(results.length === 0){
      grid.innerHTML = `<div class="alert alert-warning">No direct flights found — try different airports or date.</div>`;
      $('#searchResults').style.display='block'; return;
    }
    results.forEach(r => grid.appendChild(createFlightCard(r, pass)));
    $('#searchResults').style.display='block';
  });

  // Delegate flight select
  $('#flightsGrid').addEventListener('click', e=>{
    const btn = e.target.closest('.select-flight'); if(!btn) return;
    openFlightDetails(btn.dataset.id, Number(btn.dataset.pass) || 1);
  });

  // Open flight details
  function openFlightDetails(id, passengers){
    const f = flights.find(x=>x.id===id); if(!f) return;
    $('#flightDetails').style.display='block';
    $('#selectedFlightTitle').innerText = `${f.id} — ${f.from.split(' - ')[0]} → ${f.to.split(' - ')[0]}`;
    $('#selectedFlightSub').innerText = `${f.from} • Departs: ${f.dep} • Duration: ${f.dur}`;
    $('#selectedPrice').innerText = `${formatINR(f.price)} per pax`;
    renderSeatMap(f, passengers);
    loadExtras();
    updateSummaryForFlight(f, passengers);
    setTimeout(()=> document.getElementById('flightDetails').scrollIntoView({behavior:'smooth'}), 60);
  }

  // Seat map (select up to passengers)
  function renderSeatMap(flight, passengers){
    const map = $('#seatMap'); map.innerHTML = '';
    const rows = 6, cols = 6;
    const occupied = JSON.parse(localStorage.getItem('occupied_'+flight.id) || '[]');
    for(let r=1;r<=rows;r++){
      const row = document.createElement('div');
      for(let c=1;c<=cols;c++){
        const seatId = `${String.fromCharCode(64+r)}${c}`;
        const seat = document.createElement('div'); seat.className='seat'; seat.dataset.seat = seatId; seat.title = seatId; seat.innerText = seatId;
        if(occupied.includes(seatId)) seat.classList.add('occupied');
        seat.addEventListener('click', ()=>{
          if(seat.classList.contains('occupied')) return;
          let selected = JSON.parse(localStorage.getItem('selectedSeats_'+flight.id) || '[]');
          if(seat.classList.contains('selected')){
            selected = selected.filter(s=>s!==seatId);
            localStorage.setItem('selectedSeats_'+flight.id, JSON.stringify(selected));
            seat.classList.remove('selected'); updateSummaryForFlight(flight, passengers); return;
          }
          if(selected.length >= passengers){ alert('Select up to '+passengers+' seats'); return; }
          selected.push(seatId);
          localStorage.setItem('selectedSeats_'+flight.id, JSON.stringify(selected));
          // reflect visually
          map.querySelectorAll('.seat.selected').forEach(s=>s.classList.remove('selected'));
          selected.forEach(sid => { const el = map.querySelector(`[data-seat="${sid}"]`); if(el) el.classList.add('selected'); });
          updateSummaryForFlight(flight, passengers);
        });
        row.appendChild(seat);
      }
      map.appendChild(row);
    }
    // restore selections
    const saved = JSON.parse(localStorage.getItem('selectedSeats_'+flight.id) || '[]');
    saved.forEach(sid => { const el = map.querySelector(`[data-seat="${sid}"]`); if(el && !el.classList.contains('occupied')) el.classList.add('selected'); });
  }

  // Extras load/save
  function loadExtras(){
    const saved = JSON.parse(localStorage.getItem('selectedExtras') || '[]');
    $all('.extra-checkbox').forEach(cb => cb.checked = saved.some(s=>s.id === cb.dataset.id));
  }
  $('#saveExtras').addEventListener('click', ()=> {
    const selected = $all('.extra-checkbox').filter(x=>x.checked).map(x=>({id:x.dataset.id,name:x.dataset.name,price:Number(x.dataset.price)}));
    localStorage.setItem('selectedExtras', JSON.stringify(selected));
    alert('Extras saved');
    const fid = $('#selectedFlightTitle').innerText.split(' ')[0];
    const f = flights.find(x=>x.id===fid); if(f) updateSummaryForFlight(f, Number($('#passengers').value)||1);
  });
  $('#clearExtras').addEventListener('click', ()=> { $all('.extra-checkbox').forEach(c=>c.checked=false); localStorage.removeItem('selectedExtras'); const fid = $('#selectedFlightTitle').innerText.split(' ')[0]; const f = flights.find(x=>x.id===fid); if(f) updateSummaryForFlight(f, Number($('#passengers').value)||1); });

  // Summary & checkout binding (safe)
  function updateSummaryForFlight(f, passengers=1){
    const seats = JSON.parse(localStorage.getItem('selectedSeats_'+f.id) || '[]');
    const extras = JSON.parse(localStorage.getItem('selectedExtras') || '[]');
    const base = f.price * passengers;
    const extrasTotal = extras.reduce((s,x)=>s + x.price,0);
    const total = (base + extrasTotal).toFixed(2);
    $('#summaryBody').innerHTML = `<div><strong>${f.id}</strong> — ${f.from.split(' - ')[0]} → ${f.to.split(' - ')[0]}</div><div class="muted small">Seats: ${seats.length? seats.join(', '): 'Not selected'} • ${f.dep}</div><div class="muted small">Passengers: ${passengers}</div>`;
    $('#costItems').innerHTML = '';
    const liBase = document.createElement('li'); liBase.className='d-flex justify-content-between'; liBase.innerHTML = `<div>Base (x${passengers})</div><div>${formatINR(base)}</div>`; $('#costItems').appendChild(liBase);
    if(extras.length) extras.forEach(x=>{ const li = document.createElement('li'); li.className='d-flex justify-content-between'; li.innerHTML = `<div>${x.name}</div><div>${formatINR(x.price)}</div>`; $('#costItems').appendChild(li); });
    else { const li = document.createElement('li'); li.className='muted'; li.innerText = 'No extras selected'; $('#costItems').appendChild(li); }
    $('#costSubtotal').innerText = formatINR(base);
    $('#costExtras').innerText = formatINR(extrasTotal);
    $('#costTotal').innerText = formatINR(total);
    const old = $('#checkoutBtn'); const nb = old.cloneNode(true); old.parentNode.replaceChild(nb, old);
    nb.addEventListener('click', ()=> openPaymentForFlight(f, passengers));
    $('#costPanel').style.display = 'block';
  }

  // Payment modal open: bind handlers here (no stale listeners)
  function openPaymentForFlight(f, passengers){
    if(!$('#agreeTerms').checked){
      if(!confirm('You did not confirm passenger details — continue?')) return;
    }
    const extras = JSON.parse(localStorage.getItem('selectedExtras') || '[]');
    const base = f.price * passengers;
    const extrasTotal = extras.reduce((s,x)=>s + x.price,0);
    const total = (base + extrasTotal).toFixed(2);
    $('#payAmount').innerText = formatINR(total);

    // reset fields + UI
    $('#payMethod').value = 'card';
    $('#cardPane').style.display = 'block'; $('#upiPane').style.display = 'none'; $('#otherPane').style.display = 'none';
    $('#payName').value=''; $('#payCard').value=''; $('#payExp').value=''; $('#payCvv').value=''; $('#upiId').value=''; $('#otherRef').value=''; $('#qrImg').src=''; $('#paymentNotice').innerText='';

    // onchange handler
    $('#payMethod').onchange = function(){
      const v = this.value;
      $('#cardPane').style.display = v === 'card' ? 'block' : 'none';
      $('#upiPane').style.display = v === 'upi' ? 'block' : 'none';
      $('#otherPane').style.display = (v === 'netbank' || v === 'wallet') ? 'block' : 'none';
    };

    // scan button handler (simulate)
    $('#scanBtn').onclick = function(){
      const txn = 'UPI-' + Math.random().toString(36).slice(2,10).toUpperCase();
      $('#upiId').value = txn;
      $('#paymentNotice').innerText = 'Scanned txn id: ' + txn;
      try {
        const payload = encodeURIComponent(`txn:${txn}|amount:${total}|flight:${f.id}`);
        const url = `https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=${payload}`;
        $('#qrImg').onerror = ()=> { $('#paymentNotice').innerText = 'QR preview failed (network/demo).'; };
        $('#qrImg').onload = ()=> { $('#paymentNotice').innerText = 'QR preview generated.'; };
        $('#qrImg').src = url;
      } catch(err){ console.warn(err); $('#paymentNotice').innerText = 'QR generation error (demo).'; }
    };

    // confirm payment: safe binding by cloning
    const oldConfirm = $('#confirmPayment'); const newConfirm = oldConfirm.cloneNode(true);
    oldConfirm.parentNode.replaceChild(newConfirm, oldConfirm);
    newConfirm.addEventListener('click', function(){
      const method = $('#payMethod').value;
      // simple validations
      if(method === 'card'){
        if(!$('#payName').value.trim() || !$('#payCard').value.trim() || !$('#payExp').value.trim() || !$('#payCvv').value.trim()){
          $('#paymentNotice').innerText = 'Please fill card details.'; return;
        }
        // rudimentary card number check (digits >=12)
        if(!/^\d{12,19}$/.test($('#payCard').value.replace(/\s+/g,''))){ $('#paymentNotice').innerText = 'Invalid card number format.'; return; }
      } else if(method === 'upi'){
        if(!$('#upiId').value.trim()){ $('#paymentNotice').innerText = 'Please scan or enter UPI transaction id.'; return; }
      } else {
        if(!$('#otherRef').value.trim()){ $('#paymentNotice').innerText = 'Please enter reference/transaction id.'; return; }
      }

      // collect seats
      const seats = JSON.parse(localStorage.getItem('selectedSeats_'+f.id) || '[]');
      if(seats.length > passengers){ $('#paymentNotice').innerText = 'Selected seats exceed passenger count.'; return; }

      // build booking
      const ref = 'BK-' + Math.random().toString(36).slice(2,9).toUpperCase();
      const payRef = (method === 'card') ? ('CARD-' + Math.random().toString(36).slice(2,9).toUpperCase()) : ($('#upiId').value.trim() || $('#otherRef').value.trim());
      const qrUrl = $('#qrImg').src || null;
      const booking = {
        ref,
        flight: f.id,
        from: f.from,
        to: f.to,
        dep: f.dep,
        seats,
        passengers,
        extras,
        base,
        total: (base + extrasTotal).toFixed(2),
        paidAt: new Date().toISOString(),
        payment: { method, payRef, qr: qrUrl }
      };

      // save booking and mark seats occupied
      const all = JSON.parse(localStorage.getItem('bookings') || '[]');
      all.push(booking); localStorage.setItem('bookings', JSON.stringify(all));
      if(seats && seats.length){
        const key = 'occupied_'+f.id;
        const occ = JSON.parse(localStorage.getItem(key) || '[]');
        seats.forEach(s => { if(!occ.includes(s)) occ.push(s); });
        localStorage.setItem(key, JSON.stringify(occ));
      }

      // cleanup and UI updates
      localStorage.removeItem('selectedSeats_'+f.id);
      bootstrap.Modal.getInstance($('#paymentModal'))?.hide();
      showReceipt(booking);
      renderBookings();
      $('#paymentNotice').innerText = '';
      console.log('Payment saved', booking);
    });

    new bootstrap.Modal($('#paymentModal')).show();
  }

  // Bookings list + actions
  function renderBookings(){
    const list = $('#bookingsList'); const all = JSON.parse(localStorage.getItem('bookings') || '[]');
    if(!all.length){ list.innerHTML = '<div class="muted">No bookings yet</div>'; return; }
    list.innerHTML = all.map(b => `
      <div class="p-3 border rounded mb-2" data-ref="${b.ref}">
        <div class="d-flex justify-content-between">
          <div><strong>${b.ref}</strong><div class="muted small">${b.flight} • ${b.from.split(' - ')[0]} → ${b.to.split(' - ')[0]}</div></div>
          <div class="text-end"><div class="fw-bold">${formatINR(b.total)}</div><div class="muted small">Seats: ${b.seats && b.seats.length ? b.seats.join(', ') : '—'}</div></div>
        </div>
        <div class="mt-2 d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary btn-receipt" data-ref="${b.ref}">Receipt</button>
          <button class="btn btn-sm btn-outline-danger btn-cancel" data-ref="${b.ref}">Cancel</button>
        </div>
        <div class="mt-2 muted small">Paid via ${b.payment.method.toUpperCase()} • Ref: ${b.payment.payRef}</div>
      </div>`).join('');
  }

  // Delegate bookings clicks (receipt + cancel)
  $('#bookingsList').addEventListener('click', e=>{
    const r = e.target.closest('.btn-receipt'); if(r){ const ref = r.dataset.ref; const b = (JSON.parse(localStorage.getItem('bookings')||'[]')).find(x=>x.ref===ref); if(b) showReceipt(b); return; }
    const c = e.target.closest('.btn-cancel'); if(c){ const ref = c.dataset.ref; if(!confirm('Cancel ' + ref + '?')) return; cancelBooking(ref); }
  });

  function cancelBooking(ref){
    const all = JSON.parse(localStorage.getItem('bookings') || '[]');
    const idx = all.findIndex(x=>x.ref === ref); if(idx === -1) return alert('Booking not found');
    const b = all[idx];
    if(b.seats && b.seats.length){
      const key = 'occupied_'+b.flight; const occ = JSON.parse(localStorage.getItem(key) || '[]');
      b.seats.forEach(s => { const i = occ.indexOf(s); if(i>-1) occ.splice(i,1); });
      localStorage.setItem(key, JSON.stringify(occ));
    }
    all.splice(idx,1); localStorage.setItem('bookings', JSON.stringify(all)); renderBookings(); alert('Booking cancelled');
  }

  // Receipt modal
  function showReceipt(b){
    $('#receiptBody').innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div><h5>${b.ref}</h5><div class="muted">${b.flight} • ${b.from.split(' - ')[0]} → ${b.to.split(' - ')[0]}</div></div>
        <div class="h5">${formatINR(b.total)}</div>
      </div>
      <div><strong>Flight:</strong> ${b.flight} — ${b.from} → ${b.to}</div>
      <div><strong>Departure:</strong> ${b.dep}</div>
      <div><strong>Seats:</strong> ${b.seats && b.seats.length ? b.seats.join(', ') : 'Not assigned'}</div>
      <div><strong>Passengers:</strong> ${b.passengers}</div>
      <div class="mt-2"><strong>Extras:</strong> ${b.extras && b.extras.length ? b.extras.map(x=>`${x.name} (${formatINR(x.price)})`).join(', ') : 'None'}</div>
      <div class="mt-2"><strong>Payment:</strong> ${b.payment.method.toUpperCase()} — ${b.payment.payRef}</div>
      <div class="mt-2 muted small">Paid at: ${new Date(b.paidAt).toLocaleString()}</div>
      ${b.payment.qr ? `<div class="mt-3 text-center"><img src="${b.payment.qr}" alt="QR" style="width:220px;height:220px;border:1px solid #eee;border-radius:8px"></div>` : ''}
    `;
    new bootstrap.Modal($('#receiptModal')).show();
    $('#printReceipt').onclick = ()=> window.print();
  }

  // Simple auth (localStorage demo)
  $('#openSignup').addEventListener('click', ()=> { bootstrap.Modal.getInstance($('#loginModal'))?.hide(); new bootstrap.Modal($('#signupModal')).show(); });
  $('#signupForm').addEventListener('submit', (e)=> {
    e.preventDefault();
    const name = $('#regName').value.trim(); const email = ($('#regEmail').value||'').trim().toLowerCase(); const pass = $('#regPass').value;
    if(!email || !pass) return alert('Email & password required');
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if(users[email]) return alert('Account exists');
    users[email] = {name, pass}; localStorage.setItem('users', JSON.stringify(users));
    alert('Account created — please login'); bootstrap.Modal.getInstance($('#signupModal'))?.hide();
  });

  $('#loginForm').addEventListener('submit', (e)=> {
    e.preventDefault();
    const email = ($('#loginEmail').value||'').trim().toLowerCase(); const pass = $('#loginPass').value;
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if(users[email] && users[email].pass === pass){
      localStorage.setItem('currentUser', JSON.stringify({email, name: users[email].name || email}));
      alert('Login successful — Welcome ' + (users[email].name || email));
      bootstrap.Modal.getInstance($('#loginModal'))?.hide();
      $('#userArea').innerHTML = `<div class="muted small">Hi, ${users[email].name || email}</div>`;
    } else alert('Invalid credentials');
  });

  // Nav "My Bookings" scroll + refresh
  $('#navBookings').addEventListener('click', (e)=> { e.preventDefault(); document.getElementById('manage').scrollIntoView({behavior:'smooth'}); renderBookings(); });

  // first render
  initUI();
  renderBookings();
  console.log('Complete demo loaded — payments and bookings should work. Test: select flight -> choose passengers -> seats -> save extras -> Proceed to payment -> UPI scan -> Pay & Confirm -> check My Bookings.');
