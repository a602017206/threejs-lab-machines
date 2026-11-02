import{M as V,b as k,C as R,K as z,V as c,$ as W,au as U,W as B,h as H,j as I,as as q}from"./three.module-B9vPxLT_.js";class w extends V{constructor(P,o={}){super(P),this.isReflector=!0,this.type="Reflector",this.forceUpdate=!1,this.camera=new k;const s=this,S=o.color!==void 0?new R(o.color):new R(8355711),F=o.textureWidth||512,_=o.textureHeight||512,j=o.clipBias||0,d=o.shader||w.ReflectorShader,T=o.multisample!==void 0?o.multisample:4,l=new z,n=new c,i=new c,M=new c,u=new W,v=new c(0,0,-1),r=new U,m=new c,b=new c,f=new U,p=new W,t=this.camera,h=new B(F,_,{samples:T,type:H}),g=new I({name:d.name!==void 0?d.name:"unspecified",uniforms:q.clone(d.uniforms),fragmentShader:d.fragmentShader,vertexShader:d.vertexShader});g.uniforms.tDiffuse.value=h.texture,g.uniforms.color.value=S,g.uniforms.textureMatrix.value=p,this.material=g,this.onBeforeRender=function(e,C,x){if(i.setFromMatrixPosition(s.matrixWorld),M.setFromMatrixPosition(x.matrixWorld),u.extractRotation(s.matrixWorld),n.set(0,0,1),n.applyMatrix4(u),m.subVectors(i,M),m.dot(n)>0===!0&&this.forceUpdate===!1)return;m.reflect(n).negate(),m.add(i),u.extractRotation(x.matrixWorld),v.set(0,0,-1),v.applyMatrix4(u),v.add(M),b.subVectors(i,v),b.reflect(n).negate(),b.add(i),t.position.copy(m),t.up.set(0,1,0),t.up.applyMatrix4(u),t.up.reflect(n),t.lookAt(b),t.far=x.far,t.updateMatrixWorld(),t.projectionMatrix.copy(x.projectionMatrix),p.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),p.multiply(t.projectionMatrix),p.multiply(t.matrixWorldInverse),p.multiply(s.matrixWorld),l.setFromNormalAndCoplanarPoint(n,i),l.applyMatrix4(t.matrixWorldInverse),r.set(l.normal.x,l.normal.y,l.normal.z,l.constant);const a=t.projectionMatrix;f.x=(Math.sign(r.x)+a.elements[8])/a.elements[0],f.y=(Math.sign(r.y)+a.elements[9])/a.elements[5],f.z=-1,f.w=(1+a.elements[10])/a.elements[14],r.multiplyScalar(2/r.dot(f)),a.elements[2]=r.x,a.elements[6]=r.y,a.elements[10]=r.z+1-j,a.elements[14]=r.w,s.visible=!1;const A=e.getRenderTarget(),D=e.xr.enabled,O=e.shadowMap.autoUpdate;e.xr.enabled=!1,e.shadowMap.autoUpdate=!1,e.setRenderTarget(h),e.state.buffers.depth.setMask(!0),e.autoClear===!1&&e.clear(),e.render(C,t),e.xr.enabled=D,e.shadowMap.autoUpdate=O,e.setRenderTarget(A);const y=x.viewport;y!==void 0&&e.state.viewport(y),s.visible=!0,this.forceUpdate=!1},this.getRenderTarget=function(){return h},this.dispose=function(){h.dispose(),s.material.dispose()}}}w.ReflectorShader={name:"ReflectorShader",uniforms:{color:{value:null},tDiffuse:{value:null},textureMatrix:{value:null}},vertexShader:`
		uniform mat4 textureMatrix;
		varying vec4 vUv;

		#include <common>
		#include <logdepthbuf_pars_vertex>

		void main() {

			vUv = textureMatrix * vec4( position, 1.0 );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			#include <logdepthbuf_vertex>

		}`,fragmentShader:`
		uniform vec3 color;
		uniform sampler2D tDiffuse;
		varying vec4 vUv;

		#include <logdepthbuf_pars_fragment>

		float blendOverlay( float base, float blend ) {

			return( base < 0.5 ? ( 2.0 * base * blend ) : ( 1.0 - 2.0 * ( 1.0 - base ) * ( 1.0 - blend ) ) );

		}

		vec3 blendOverlay( vec3 base, vec3 blend ) {

			return vec3( blendOverlay( base.r, blend.r ), blendOverlay( base.g, blend.g ), blendOverlay( base.b, blend.b ) );

		}

		void main() {

			#include <logdepthbuf_fragment>

			vec4 base = texture2DProj( tDiffuse, vUv );
			gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};export{w as R};
