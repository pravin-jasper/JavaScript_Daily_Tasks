const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const STORE = {
	jobs: 'careerly_jobs_v1',
	saved: 'careerly_saved_v1',
	users: 'careerly_users_v1',
	session: 'careerly_session_v1'
};
const demoJobs = [{
		id: 'demo-1',
		title: 'Frontend Developer',
		company_name: 'Northstar Labs',
		location: 'Remote · India',
		job_type: 'Full Time',
		category: 'Software Development',
		salary: '₹8L – ₹14L',
		url: '#',
		description: '<p>Build polished, accessible web experiences with a collaborative product team.</p><h3>What you will do</h3><ul><li>Develop responsive UI with modern JavaScript.</li><li>Work with designers and backend engineers.</li><li>Improve performance, accessibility, and quality.</li></ul><h3>What we are looking for</h3><p>Experience with HTML, CSS, JavaScript, responsive design, and Git.</p>',
		created_at: '2026-10-24'
	},
	{
		id: 'demo-2',
		title: 'Product Designer',
		company_name: 'Mosaic Studio',
		location: 'Bengaluru, India',
		job_type: 'Full Time',
		category: 'Design',
		salary: '₹10L – ₹18L',
		url: '#',
		description: '<p>Shape simple and delightful experiences from early research through final UI.</p><h3>Responsibilities</h3><ul><li>Translate user needs into flows and prototypes.</li><li>Partner with product and engineering.</li><li>Maintain a consistent design system.</li></ul>',
		created_at: '2026-10-23'
	},
	{
		id: 'demo-3',
		title: 'Digital Marketing Associate',
		company_name: 'Brightside',
		location: 'Remote',
		job_type: 'Part Time',
		category: 'Marketing',
		salary: '₹25k – ₹40k / month',
		url: '#',
		description: '<p>Help a growing team tell its story across digital channels.</p><h3>Responsibilities</h3><ul><li>Support campaign planning and reporting.</li><li>Create social content and track engagement.</li></ul>',
		created_at: '2026-10-22'
	},
	{
		id: 'demo-4',
		title: 'Backend Engineer',
		company_name: 'Cloud Harbor',
		location: 'Chennai, India',
		job_type: 'Contract',
		category: 'Software Development',
		salary: '₹1,000 – ₹1,800 / day',
		url: '#',
		description: '<p>Build reliable APIs and services for a fast-moving product team.</p><h3>Skills</h3><p>JavaScript, REST APIs, databases, testing, and clean code practices.</p>',
		created_at: '2026-10-21'
	},
	{
		id: 'demo-5',
		title: 'UX Research Intern',
		company_name: 'Fieldnote',
		location: 'Hyderabad, India',
		job_type: 'Internship',
		category: 'Research',
		salary: '₹20k / month',
		url: '#',
		description: '<p>Help teams understand customer needs through research and synthesis.</p><h3>Responsibilities</h3><ul><li>Assist with interviews and usability studies.</li><li>Summarise insights into actionable findings.</li></ul>',
		created_at: '2026-10-20'
	},
	{
		id: 'demo-6',
		title: 'Content Writer',
		company_name: 'Paper Kite',
		location: 'Remote',
		job_type: 'Freelance',
		category: 'Writing',
		salary: 'Project based',
		url: '#',
		description: '<p>Write clear, useful content that helps people learn and make decisions.</p><h3>Skills</h3><p>Strong writing, editing, research, and attention to detail.</p>',
		created_at: '2026-10-19'
	}
];
let jobs = [];
const read = (key, fallback = []) => {
	try {
		return JSON.parse(localStorage.getItem(key)) ?? fallback;
	} catch {
		return fallback;
	}
};
const write = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const esc = (v = '') => String(v).replace(/[&<>"']/g, c => ({
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;'
} [c]));
const clean = (v = '') => String(v).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/on\w+="[^"]*"/gi, '');
const currentUser = () => read(STORE.session, null);

function header() {
	const user = currentUser();
	$('#app-header').innerHTML = `<header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur"><nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><a href="index.html" class="flex items-center gap-2 text-xl font-extrabold tracking-tight"><span class="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white">✦</span>careerly<span class="text-indigo-600">.</span></a><div class="hidden items-center gap-7 md:flex"><a class="nav-link" href="jobs.html">Find jobs</a><a class="nav-link" href="bookmarks.html">Saved jobs <span id="saved-count" class="ml-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">0</span></a><a class="nav-link" href="about.html">About</a></div><div class="flex items-center gap-3">${user?`<span class="hidden text-sm text-slate-500 sm:inline">Hi, ${esc(user.name.split(' ')[0])}</span><button id="logout-btn" class="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold hover:bg-slate-50">Log out</button>`:`<a href="login.html" class="hidden rounded-xl px-3 py-2 text-sm font-semibold sm:inline">Log in</a><a href="signup.html" class="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-indigo-700">Sign up</a>`}</div></nav></header>`;
	updateSavedCount();
	$('#logout-btn')?.addEventListener('click', () => {
		localStorage.removeItem(STORE.session);
		location.href = 'index.html';
	});
}

function footer() {
	$('#app-footer').innerHTML = `<footer class="border-t border-slate-200 bg-white"><div class="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Careerly. Find your next chapter.</p><div class="flex gap-5"><a href="about.html" class="hover:text-indigo-600">About</a><a href="jobs.html" class="hover:text-indigo-600">Browse jobs</a><a href="bookmarks.html" class="hover:text-indigo-600">Saved jobs</a></div></div></footer>`;
}

function updateSavedCount() {
	const el = $('#saved-count');
	if (el) el.textContent = read(STORE.saved, []).length;
}

function normaliseApi(item, i) {
	return {
		id: String(item.id ?? item.slug ?? `api-${i}`),
		title: item.title ?? 'Untitled role',
		company_name: item.company_name ?? item.company ?? 'Company not listed',
		location: item.candidate_required_location ?? item.location ?? 'Location not specified',
		job_type: formatType(item.job_type ?? item.type ?? 'Full Time'),
		category: item.category ?? item.tags?.[0] ?? 'General',
		salary: item.salary ?? '',
		url: item.url ?? item.apply_url ?? '#',
		description: item.description ?? item.description_text ?? '',
		created_at: item.publication_date ?? item.created_at ?? ''
	};
}

function formatType(v) {
	const s = String(v).toLowerCase();
	if (s.includes('part')) return 'Part Time';
	if (s.includes('contract')) return 'Contract';
	if (s.includes('intern')) return 'Internship';
	if (s.includes('freelance')) return 'Freelance';
	return 'Full Time';
}
async function loadJobs() {
	const cached = read(STORE.jobs, []);
	if (cached.length) jobs = cached;
	try {
		const res = await fetch('https://www.arbeitnow.com/api/job-board-api');
		if (!res.ok) throw new Error('API unavailable');
		const data = await res.json();
		const list = (data.data ?? []).slice(0, 80).map(normaliseApi);
		if (list.length) jobs = list;
	} catch (err) {
		if (!jobs.length) jobs = demoJobs;
	}
	write(STORE.jobs, jobs);
	return jobs;
}

function savedIds() {
	return read(STORE.saved, []).map(String);
}

function toggleSave(id) {
	let saved = savedIds();
	saved = saved.includes(String(id)) ? saved.filter(x => x !== String(id)) : [...saved, String(id)];
	write(STORE.saved, saved);
	updateSavedCount();
	return saved.includes(String(id));
}

function badge(text) {
	return `<span class="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">${esc(text||'Full Time')}</span>`;
}

function jobCard(j) {
	const isSaved = savedIds().includes(String(j.id));
	return `<article class="job-card rounded-2xl border border-slate-200 bg-white p-5 md:p-6"><div class="flex items-start gap-4"><div class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-100 to-cyan-100 text-lg font-extrabold text-indigo-700">${esc((j.company_name||'C').slice(0,1).toUpperCase())}</div><div class="min-w-0 flex-1"><div class="flex flex-wrap items-start justify-between gap-2"><div><h3 class="text-lg font-bold leading-snug"><a class="hover:text-indigo-600" href="job-details.html?id=${encodeURIComponent(j.id)}">${esc(j.title)}</a></h3><p class="mt-1 text-sm text-slate-500">${esc(j.company_name)}</p></div><button class="save-btn rounded-xl border border-slate-200 px-3 py-2 text-sm hover:border-indigo-300 hover:bg-indigo-50" data-save="${esc(j.id)}" aria-label="Bookmark ${esc(j.title)}">${isSaved?'🔖 Saved':'＋ Save'}</button></div><div class="mt-4 flex flex-wrap gap-2">${badge(j.job_type)}<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">⌖ ${esc(j.location||'Not specified')}</span>${j.salary?`<span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">${esc(j.salary)}</span>`:''}</div><p class="mt-4 line-clamp-3 text-sm leading-6 text-slate-500">${esc(stripHtml(j.description).slice(0,190))}</p><a href="job-details.html?id=${encodeURIComponent(j.id)}" class="mt-4 inline-flex font-semibold text-indigo-600 hover:text-indigo-800">View details →</a></div></div></article>`;
}

function stripHtml(s = '') {
	const d = document.createElement('div');
	d.innerHTML = s;
	return d.textContent || d.innerText || '';
}

function bindSaveButtons(root = document) {
	$$('[data-save]', root).forEach(btn => btn.addEventListener('click', () => {
		const on = toggleSave(btn.dataset.save);
		btn.textContent = on ? '🔖 Saved' : '＋ Save';
		btn.classList.toggle('border-indigo-300', on);
		if (document.body.dataset.page === 'bookmarks' && !on) renderBookmarks();
	}));
}

function renderJobs() {
	const list = $('#jobs-list');
	if (!list) return;
	const q = ($('#filter-query')?.value || new URLSearchParams(location.search).get('q') || '').trim().toLowerCase();
	const loc = ($('#filter-location')?.value || '').trim().toLowerCase();
	const type = ($('#filter-type')?.value || '').toLowerCase();
	const sort = $('#filter-sort')?.value || 'recent';
	let result = jobs.filter(j => (`${j.title} ${j.company_name} ${j.category}`.toLowerCase().includes(q)) && (String(j.location).toLowerCase().includes(loc)) && (!type || String(j.job_type).toLowerCase() === type));
	if (sort === 'title') result.sort((a, b) => a.title.localeCompare(b.title));
	else if (sort === 'company') result.sort((a, b) => a.company_name.localeCompare(b.company_name));
	else result.sort((a, b) => String(b.created_at).localeCompare(String(a.created_at)));
	$('#results-count').textContent = `${result.length} ${result.length===1?'role':'roles'} found`;
	list.innerHTML = result.length ? result.map(jobCard).join('') : `<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><div class="text-4xl">🔎</div><h3 class="mt-4 text-xl font-bold">No matching jobs</h3><p class="mt-2 text-slate-500">Try another keyword or clear your filters.</p></div>`;
	bindSaveButtons(list);
}

function renderBookmarks() {
	const el = $('#bookmarks-list');
	if (!el) return;
	const ids = savedIds();
	const list = jobs.filter(j => ids.includes(String(j.id)));
	el.innerHTML = list.length ? list.map(jobCard).join('') : `<div class="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center md:col-span-2"><div class="text-4xl">🔖</div><h2 class="mt-4 text-xl font-bold">No saved jobs yet</h2><p class="mt-2 text-slate-500">When a role catches your eye, save it here.</p><a href="jobs.html" class="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white">Explore jobs →</a></div>`;
	bindSaveButtons(el);
}

function renderDetails() {
	const el = $('#job-detail-content');
	const id = new URLSearchParams(location.search).get('id');
	const j = jobs.find(x => String(x.id) === String(id));
	if (!j) {
		el.innerHTML = `<div class="rounded-2xl bg-white p-10 text-center"><h1 class="text-2xl font-bold">Job not found</h1><p class="mt-2 text-slate-500">This listing may have expired or been removed.</p><a href="jobs.html" class="mt-5 inline-flex text-indigo-600">Browse available jobs →</a></div>`;
		return;
	}
	const isSaved = savedIds().includes(String(j.id));
	el.innerHTML = `<article class="overflow-hidden rounded-3xl border border-slate-200 bg-white"><div class="bg-gradient-to-r from-indigo-950 to-indigo-700 p-7 text-white md:p-10"><div class="flex flex-wrap items-start justify-between gap-5"><div class="flex gap-4"><div class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/15 text-2xl font-bold">${esc((j.company_name||'C').slice(0,1))}</div><div><p class="text-sm text-indigo-200">${esc(j.company_name)}</p><h1 class="mt-1 text-3xl font-extrabold md:text-4xl">${esc(j.title)}</h1><p class="mt-3 text-indigo-100">⌖ ${esc(j.location||'Location not specified')} · ${esc(j.category||'General')}</p></div></div><button id="detail-save" class="rounded-xl bg-white px-4 py-3 font-bold text-indigo-800 hover:bg-indigo-50">${isSaved?'🔖 Saved':'＋ Save job'}</button></div><div class="mt-6 flex flex-wrap gap-2">${badge(j.job_type)}${j.salary?`<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">${esc(j.salary)}</span>`:''}</div></div><div class="grid gap-10 p-7 md:grid-cols-[1fr_270px] md:p-10"><div><h2 class="text-xl font-bold">About this role</h2><div class="prose-job mt-4 leading-7 text-slate-600">${clean(j.description||'<p>Check the employer listing for more information about this opportunity.</p>')}</div><h2 class="mt-8 text-xl font-bold">Job overview</h2><dl class="mt-4 grid gap-4 sm:grid-cols-2"><div class="rounded-xl bg-slate-50 p-4"><dt class="text-sm text-slate-500">Company</dt><dd class="mt-1 font-semibold">${esc(j.company_name)}</dd></div><div class="rounded-xl bg-slate-50 p-4"><dt class="text-sm text-slate-500">Job type</dt><dd class="mt-1 font-semibold">${esc(j.job_type)}</dd></div><div class="rounded-xl bg-slate-50 p-4"><dt class="text-sm text-slate-500">Location</dt><dd class="mt-1 font-semibold">${esc(j.location)}</dd></div><div class="rounded-xl bg-slate-50 p-4"><dt class="text-sm text-slate-500">Posted</dt><dd class="mt-1 font-semibold">${esc(j.created_at?new Date(j.created_at).toLocaleDateString():'Recently')}</dd></div></dl></div><aside class="h-fit rounded-2xl border border-slate-200 p-5"><h3 class="font-bold">Interested in this role?</h3><p class="mt-2 text-sm leading-6 text-slate-500">Review the requirements and apply on the employer’s website.</p><a target="_blank" rel="noopener noreferrer" href="${esc(j.url||'#')}" class="mt-5 block rounded-xl bg-indigo-600 px-4 py-3 text-center font-bold text-white hover:bg-indigo-700">Apply on company site ↗</a><p class="mt-3 text-xs text-slate-400">External application links open in a new tab.</p></aside></div></article>`;
	$('#detail-save').addEventListener('click', e => {
		const on = toggleSave(j.id);
		e.currentTarget.textContent = on ? '🔖 Saved' : '＋ Save job';
	});
}

function initAuth() {
	const signup = $('#signup-form');
	signup?.addEventListener('submit', e => {
		e.preventDefault();
		const name = $('#signup-name').value.trim(),
			email = $('#signup-email').value.trim().toLowerCase(),
			pass = $('#signup-password').value,
			confirm = $('#signup-confirm').value,
			msg = $('#signup-message');
		msg.className = 'text-sm text-rose-600';
		if (name.length < 2) return msg.textContent = 'Please enter your full name.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return msg.textContent = 'Enter a valid email address.';
		if (pass.length < 8) return msg.textContent = 'Password must be at least 8 characters.';
		if (pass !== confirm) return msg.textContent = 'Passwords do not match.';
		const users = read(STORE.users, []);
		if (users.some(u => u.email === email)) return msg.textContent = 'An account with this email already exists.';
		users.push({
			name,
			email,
			password: pass
		});
		write(STORE.users, users);
		msg.className = 'text-sm text-emerald-700';
		msg.textContent = 'Account created! Taking you to login…';
		setTimeout(() => location.href = 'login.html', 900);
	});
	const login = $('#login-form');
	login?.addEventListener('submit', e => {
		e.preventDefault();
		const email = $('#login-email').value.trim().toLowerCase(),
			pass = $('#login-password').value,
			msg = $('#login-message');
		const user = read(STORE.users, []).find(u => u.email === email && u.password === pass);
		if (!user) {
			msg.className = 'text-sm text-rose-600';
			msg.textContent = 'Email or password is incorrect. Create a demo account first if needed.';
			return;
		}
		write(STORE.session, {
			name: user.name,
			email: user.email
		});
		msg.className = 'text-sm text-emerald-700';
		msg.textContent = 'Logged in successfully!';
		setTimeout(() => location.href = 'index.html', 500);
	});
}
async function init() {
	header();
	footer();
	initAuth();
	const page = document.body.dataset.page;
	if (['home', 'jobs', 'details', 'bookmarks'].includes(page)) await loadJobs();
	if (page === 'home') {
		const target = $('#featured-jobs');
		target.innerHTML = jobs.slice(0, 3).map(jobCard).join('');
		bindSaveButtons(target);
		$('#hero-search').addEventListener('submit', e => {
			e.preventDefault();
			location.href = `jobs.html?q=${encodeURIComponent($('#hero-query').value.trim())}`;
		});
		$$('.popular-term').forEach(b => b.addEventListener('click', () => location.href = `jobs.html?q=${encodeURIComponent(b.dataset.term)}`));
	}
	if (page === 'jobs') {
		const query = new URLSearchParams(location.search).get('q');
		if (query) $('#filter-query').value = query;
		['filter-query', 'filter-location', 'filter-type', 'filter-sort'].forEach(id => $('#' + id).addEventListener('input', renderJobs));
		$('#clear-filters').addEventListener('click', () => {
			$('#filter-query').value = '';
			$('#filter-location').value = '';
			$('#filter-type').value = '';
			$('#filter-sort').value = 'recent';
			renderJobs();
		});
		$('#refresh-jobs').addEventListener('click', async () => {
			jobs = [];
			await loadJobs();
			renderJobs();
		});
		renderJobs();
	}
	if (page === 'details') renderDetails();
	if (page === 'bookmarks') renderBookmarks();
}
document.addEventListener('DOMContentLoaded', init);
