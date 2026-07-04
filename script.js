// JAK Conference 2026 — schedule logic
// Builds real Date objects from data.js, then continuously figures out
// what's live right now and how long until the next item starts.

const UK_SUMMER_OFFSET = "+01:00"; // BST — the event is in July

function buildItems(schedule, eventDate) {
  const items = schedule.map((entry) => ({
    ...entry,
    start: new Date(`${eventDate}T${entry.time}:00${UK_SUMMER_OFFSET}`),
  }));

  items.forEach((item, i) => {
    const next = items[i + 1];
    if (next) {
      item.end = next.start;
    } else {
      const fallbackMinutes = item.durationMinutes || 15;
      item.end = new Date(item.start.getTime() + fallbackMinutes * 60000);
    }
  });

  return items;
}

const ITEMS = buildItems(SCHEDULE, EVENT_DATE);

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: EVENT_TIMEZONE,
  hour: "numeric",
  minute: "2-digit",
});

const clockFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: EVENT_TIMEZONE,
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function formatTime(date) {
  return timeFormatter.format(date).replace(/^24:/, "00:");
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (h > 0) return `${h}h ${pad(m)}m ${pad(s)}s`;
  if (m > 0) return `${m}m ${pad(s)}s`;
  return `${s}s`;
}

function findState(now) {
  const live = ITEMS.find((item) => now >= item.start && now < item.end);
  const next = ITEMS.find((item) => item.start > now);
  const first = ITEMS[0];
  const last = ITEMS[ITEMS.length - 1];
  return { live, next, first, last };
}

function speakersLine(item) {
  if (!item.speakers || item.speakers.length === 0) return "";
  return item.speakers.join(", ");
}

function renderStatusCard(now) {
  const card = document.getElementById("status-card");
  const { live, next, first, last } = findState(now);

  if (now < first.start) {
    const untilStart = first.start - now;
    card.innerHTML = `
      <span class="status-badge upcoming">Before the event</span>
      <h3>${first.title}</h3>
      ${first.subtitle ? `<p class="status-subtitle">${first.subtitle}</p>` : ""}
      <div class="status-meta">
        <div><strong>Starts in</strong><br>${formatDuration(untilStart)}</div>
        <div><strong>First session at</strong><br>${formatTime(first.start)}</div>
      </div>
    `;
    return;
  }

  if (now >= last.end) {
    card.innerHTML = `
      <span class="status-badge done">Event concluded</span>
      <h3>JAK Conference 2026 has ended</h3>
      <p class="status-subtitle">Thank you for joining us — see you next year!</p>
    `;
    return;
  }

  if (live) {
    const remaining = live.end - now;
    const total = live.end - live.start;
    const elapsed = now - live.start;
    const pct = Math.min(100, Math.max(0, (elapsed / total) * 100));
    const nextLine = next
      ? `<div><strong>Next up</strong><br>${next.title} at ${formatTime(next.start)}</div>
         <div><strong>Starts in</strong><br>${formatDuration(next.start - now)}</div>`
      : "";
    card.innerHTML = `
      <span class="status-badge live"><span class="live-dot"></span>Now presenting</span>
      <h3>${live.title}</h3>
      ${live.subtitle ? `<p class="status-subtitle">${live.subtitle}</p>` : ""}
      ${speakersLine(live) ? `<p class="status-speakers">${speakersLine(live)}</p>` : ""}
      <div class="status-meta">
        <div><strong>Time</strong><br>${formatTime(live.start)} – ${formatTime(live.end)}</div>
        <div><strong>Ends in</strong><br>${formatDuration(remaining)}</div>
        ${nextLine}
      </div>
      <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
    `;
    return;
  }

  // Gap between two sessions (shouldn't normally happen since end = next start)
  if (next) {
    card.innerHTML = `
      <span class="status-badge upcoming">Coming up</span>
      <h3>${next.title}</h3>
      ${next.subtitle ? `<p class="status-subtitle">${next.subtitle}</p>` : ""}
      <div class="status-meta">
        <div><strong>Starts in</strong><br>${formatDuration(next.start - now)}</div>
        <div><strong>Starts at</strong><br>${formatTime(next.start)}</div>
      </div>
    `;
  }
}

function renderScheduleList(now) {
  const list = document.getElementById("schedule-list");
  list.innerHTML = "";

  ITEMS.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "schedule-item";
    if (now >= item.start && now < item.end) li.classList.add("is-live");
    else if (now >= item.end) li.classList.add("is-done");

    li.innerHTML = `
      <div class="schedule-time">${formatTime(item.start)}</div>
      <div>
        <p class="schedule-title">${now >= item.start && now < item.end ? '<span class="live-dot"></span>' : ""}${item.title}</p>
        ${item.subtitle ? `<p class="schedule-subtitle">${item.subtitle}</p>` : ""}
        ${speakersLine(item) ? `<p class="schedule-speakers">${speakersLine(item)}</p>` : ""}
      </div>
    `;
    li.addEventListener("click", () => openModal(index));
    list.appendChild(li);
  });
}

function openModal(index) {
  const item = ITEMS[index];
  const overlay = document.getElementById("overlay");
  const content = document.getElementById("modal-content");

  const detailsHtml = item.details
    ? Array.isArray(item.details)
      ? item.details.map((p) => `<p>${p}</p>`).join("")
      : `<p>${item.details}</p>`
    : `<p class="modal-placeholder">More details coming soon.</p>`;

  content.innerHTML = `
    <p class="modal-time">${formatTime(item.start)} – ${formatTime(item.end)}</p>
    <h2>${item.title}</h2>
    ${item.subtitle ? `<p class="modal-subtitle">${item.subtitle}</p>` : ""}
    ${speakersLine(item) ? `<p class="modal-speakers">${speakersLine(item)}</p>` : ""}
    <div class="modal-details">${detailsHtml}</div>
  `;

  overlay.hidden = false;
}

function closeModal() {
  document.getElementById("overlay").hidden = true;
}

document.getElementById("modal-close").addEventListener("click", closeModal);
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target.id === "overlay") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

function tick() {
  const now = new Date();
  document.getElementById("clock").textContent = clockFormatter.format(now);
  renderStatusCard(now);
  renderScheduleList(now);
}

tick();
setInterval(tick, 1000);
