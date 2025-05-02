---
title: Frontend dev. checklist
description: Frontend dev. checklist
date: 04/17/2025
status: draft
living: true
---

# Frontend dev. checklist

_Checklist state is persisted in localStorage._

---

<label>Ticket number or desc.:<br />
<input name="ticket-number" class="border !border-gray-400 px-1" type="text" placeholder="ex: JIRA-666" />
</label>

## General

- <label><input name="general__dev-matches-ticket" type="checkbox"> Dev. matches ticket's requirements</label>
  - <label><input name="general__dev-happy-path" type="checkbox"> Happy path works as intended</label>
  - <label><input name="general__dev-error-paths" type="checkbox"> Error paths are handled correctly</label>
- <label><input name="general__manually-tested" type="checkbox"> Authors have manually tested their development</label>
- <label><input name="general__tests" type="checkbox"> Tests have been written to cover new code</label>
- <label><input name="general__docs" type="checkbox"> Documentation has been written</label>
- <label><input name="general__pr-self-review" type="checkbox"> Authors have self-reviewed their PR before submitting it</label>
- <label><input name="general__screenshots-pr" type="checkbox"> Before/after screenshots of added/updated features have been added to PR</label>

## Cross-device, cross-browser

- <label><input name="cross-device__responsive" type="checkbox"> Dev. works on mobile and desktop</label>
- <label><input name="cross-device__cross-browser" type="checkbox"> Dev. works on major browsers (Chrome, Firefox, Safari)</label>

## A11Y

- <label><input name="a11y__keyboard" type="checkbox"> The whole feature is usable using a keyboard only</label>

## Forms

### `type="file"` inputs

- <label><input name="input-file__upload-file" type="checkbox"> Input accepts uploading a file</label>
- <label><input name="input-file__drop" type="checkbox"> Input accepts dropping a file</label>
- <label><input name="input-file__multiple-upload" type="checkbox"> Input accepts uploading multiple files</label>
- <label><input name="input-file__multiple-drop" type="checkbox"> Input accepts dropping multiple files</label>
- <label><input name="input-file__file-size" type="checkbox"> Input limits file size</label>
- <label><input name="input-file__file-type" type="checkbox"> Input limits file type using `accept` attribute</label>

<script>
  const LOCAL_STORAGE_KEY = 'frontend-dev-checklist';
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  // TODO: uncomment
  // TODO: persist ticketNumber field
  // TODO: move checkboxes state to nested object
  // if ("localStorage" in window) {
  //   const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    
  //   if (savedState) {
  //     const states = JSON.parse(savedState);

  //     for (const checkbox of checkboxes) {
  //       if (!!states[checkbox.name]) {
  //         checkbox.checked = true;
  //       }
  //     }
  //   }
  // }

  // for (const checkbox of checkboxes) {
  //   checkbox.addEventListener('change', function() {
      
  //     const states = Array.from(checkboxes).reduce((acc, checkbox) => ({
  //       ...acc,
  //       [checkbox.name]: checkbox.checked
  //     }), {});

  //     console.log(states);

  //     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(states));
  //   });
  // }
</script>
