import { execSync } from 'child_process';

console.log('🚀 [GlitchCloud Deploy] Starting automated build and deployment process...');

try {
  console.log('\n📦 Step 1: Compiling production frontend bundle (npm run build)...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Step 1 complete: Build directory `dist/` ready.');

  console.log('\n🔥 Step 2: Deploying services to Firebase (Hosting, Firestore rules)...');
  execSync('npx -y firebase-tools@latest deploy --only hosting,firestore', { stdio: 'inherit' });
  console.log('\n🎉 [GlitchCloud Deploy] Deployment complete! App is live and running 24/7 on Firebase Hosting.');
} catch (error) {
  console.error('\n❌ [GlitchCloud Deploy] Deployment error:', error.message);
  process.exit(1);
}
