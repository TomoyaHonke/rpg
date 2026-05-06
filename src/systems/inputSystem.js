export function isConfirmKey(event) {
  return (
    event.key === ' ' ||
    event.key === 'Enter' ||
    event.key === 'z' ||
    event.key === 'Z'
  );
}

export function isCancelKey(event) {
  return (
    event.key === 'Escape' ||
    event.key === 'x' ||
    event.key === 'X'
  );
}

export function isMoveUpKey(event) {
  return event.key === 'ArrowUp' || event.key === 'w';
}

export function isMoveDownKey(event) {
  return event.key === 'ArrowDown' || event.key === 's';
}

export function isMoveLeftKey(event) {
  return event.key === 'ArrowLeft' || event.key === 'a';
}

export function isMoveRightKey(event) {
  return event.key === 'ArrowRight' || event.key === 'd';
}

export function updateMoveKeyDown(event, keys) {
  let handled = false;

  if (isMoveUpKey(event)) {
    keys.up = true;
    handled = true;
  }

  if (isMoveDownKey(event)) {
    keys.down = true;
    handled = true;
  }

  if (isMoveLeftKey(event)) {
    keys.left = true;
    handled = true;
  }

  if (isMoveRightKey(event)) {
    keys.right = true;
    handled = true;
  }

  return handled;
}

export function updateMoveKeyUp(event, keys) {
  let handled = false;

  if (isMoveUpKey(event)) {
    keys.up = false;
    handled = true;
  }

  if (isMoveDownKey(event)) {
    keys.down = false;
    handled = true;
  }

  if (isMoveLeftKey(event)) {
    keys.left = false;
    handled = true;
  }

  if (isMoveRightKey(event)) {
    keys.right = false;
    handled = true;
  }

  return handled;
}