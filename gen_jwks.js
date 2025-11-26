import { exportJWK, importPKCS8 } from 'jose';
import fs from 'fs';

async function generateJWKS() {
  try {
    const privateKeyPem = fs.readFileSync('private_key_pkcs8.pem', 'utf8');
    const privateKey = await importPKCS8(privateKeyPem, 'RS256');
    const privateJwk = await exportJWK(privateKey);
    
    // Create public JWK by removing private parameters
    const { d, p, q, dp, dq, qi, ...publicJwk } = privateJwk;
    
    // Add required properties for JWKS
    publicJwk.use = 'sig';
    publicJwk.alg = 'RS256';
    
    const jwks = {
      keys: [publicJwk]
    };
    
    console.log(JSON.stringify(jwks));
  } catch (error) {
    console.error('Error generating JWKS:', error);
    process.exit(1);
  }
}

generateJWKS();

