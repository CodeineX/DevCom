export function detectCollision(ball, gameObject){

  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;

  let topOfGameObject = gameObject.position.y;
  let bottomOfGameObject = gameObject.position.y + gameObject.height;
  let leftOfGameObject = gameObject.position.x;
  let rightOfGameObject = gameObject.position.x + gameObject.width;

  if (
    bottomOfBall >= topOfGameObject &&
    topOfBall <= bottomOfGameObject &&
    ball.position.x >= leftOfGameObject &&
    ball.position.x + ball.size <= rightOfGameObject
  ) return true;
  else return false;
}