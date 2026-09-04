const crypto=require('crypto');
const jwt=require('jsonwebtoken');

// V6 uses scrypt with a per-user random salt. Legacy SHA-256 hashes remain
// readable so existing installations can be upgraded transparently at login.
function hashPassword(password){
  const salt=crypto.randomBytes(16).toString('hex');
  const key=crypto.scryptSync(String(password),salt,64,{N:16384,r:8,p:1});
  return `scrypt$${salt}$${key.toString('hex')}`;
}
function verifyPassword(password,stored){
  const value=String(stored||'');
  if(value.startsWith('scrypt$')){
    const [,salt,hex]=value.split('$');
    if(!salt||!hex)return false;
    const key=crypto.scryptSync(String(password),salt,64,{N:16384,r:8,p:1});
    const actual=Buffer.from(hex,'hex');
    return actual.length===key.length&&crypto.timingSafeEqual(actual,key);
  }
  const legacy=crypto.createHash('sha256').update(String(password)).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(legacy),Buffer.from(value));
}
function needsRehash(stored){return !String(stored||'').startsWith('scrypt$')}
function sign(user){return jwt.sign({id:user.id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:'12h'})}
function requireAuth(req,res,next){const h=req.headers.authorization||'';if(!h.startsWith('Bearer '))return res.status(401).json({error:'Authentication required'});try{req.user=jwt.verify(h.slice(7),process.env.JWT_SECRET);next()}catch(e){return res.status(401).json({error:'Invalid or expired token'})}}
module.exports={hashPassword,verifyPassword,needsRehash,sign,requireAuth};
