~function(){
    const params = new URL(location.href).searchParams;
    const msg_url = "https://twitter.com/messages/compose?recipient_id=1090682326709952512&text=%47%72%65%61%74%20%63%68%61%6C%6C%65%6E%67%65%21%20%68%65%72%65%20%69%73%20%6D%79%20%73%6F%6C%75%74%69%6F%6E%3A%20"
    
    const t = params.get('t') || Math.floor(Date.now()/60000);
    
    const url = new URL(location.origin);
    url.pathname = location.pathname;
    url.searchParams.set('t', t);
    history.replaceState(null, null, url.href);
    
    window.name = "Harder XSS Challenge by @terjanq";
    opener = null;
    
    const e = encodeURIComponent;
    
    window.displayHoF = function(obj){
        const hof = document.getElementById('hof');
        const solvers = obj.solvers;
     
        for(let s of solvers){
            let li = document.createElement('li');
            li.className = s.intended ? "intended": "uninteded"
            let time = new Date(parseInt(s.timestamp)).toUTCString();
            let solution = ` with <span class="type">${s.intended ? 'intended': 'unintended'}</span> solution`;
            let comment = s.comment ? ` <span class="comment">${s.comment}</span>`:'';
            let url = s.url || `https://twitter.com/${e(s.name)}`
            let at = ` at <span class="time">${time}</span>`
            li.innerHTML = `<a target="_blank" href="${url}">${s.name}</a>${solution}${comment}${at}`
            hof.appendChild(li);
        }
        let li = document.createElement('li');
        li.innerHTML = `<a target="_blank" href="${msg_url}">You?</a>`;
        hof.appendChild(li);
    }
    
    
    window.displayRules = function(){
        const rules_ul = document.getElementById('rules');
        const rules = [
            `The goal is to call <strong><code>alert(secret)</code></strong> <strong>on this page</strong>, where <code>secret</code> is a secret from the JSON object`, 
            `The solution must work on the latest version of <strong>both</strong> Chrome and Firefox`, 
            `The solution must respect the CSP`, 
            `Only <strong><code>harderxss.terjanq.me</code></strong> domain can be used in the solution, i.e. using other subdomains such as <code>*.terjanq.me<code> or <code>terjanq.me</code> is disallowed`, 
            `No user interaction is allowed`, 
            `Please don't bruteforce &mdash; <strong>there are no hidden endpoints</strong>`, 
            `Solved? Message me on twitter <a target="_blank" href="${msg_url}">@terjanq</a>`,
            `Don't forget to follow the twitter <a target="_blank" href="https://twitter.com/terjanq/status/1284990014615695361">thread</a> for updates`,
            `For transparency, here is a <a target="_blank" href="https://gist.github.com/terjanq/c5f2ced6218c41ec863d00a29553683b">list</a> of all changes made to the challenge`
        ];
        
        for(let r of rules){
            let li = document.createElement('li');
            li.innerHTML = r;
            rules_ul.appendChild(li);
        }
    }
     
    window.addEventListener("load", () => {
        const hof = document.createElement('script');
        hof.src = `/hof?cb=displayHoF&t=${t}`;
        document.head.appendChild(hof); 
        displayRules();
    });
  
}()
