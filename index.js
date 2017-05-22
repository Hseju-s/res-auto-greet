module.exports = function AutoGreet(dispatch) {
    let currLocation = null,
        offCooldown = null,
        canUse = null;
    
    dispatch.hook('C_PLAYER_LOCATION', 1, event => { currLocation = event })
    
    dispatch.hook('C_REVIVE_NOW', 1, event => {
        if(event.type == '1') setTimeout(animationLock, 2000);    
    })
    
    function animationLock(){
        if(!onCooldown()) greet();
        else setTimeout(greet, canUse);
    }
    
    function greet(){
        dispatch.toServer('C_START_INSTANCE_SKILL', 1, {
            skill: 127510165,
			x: currLocation.x1,
			y: currLocation.y1,
			z: currLocation.z1,
			w: currLocation.w,
            unk: 0,
            targets: [],
            locs: [{
                    x: currLocation.x1 + ((Math.random()*150)+1),
                    y: currLocation.y1 + ((Math.random()*150)+1),
                    z: currLocation.z1 + ((Math.random()*150)+1)
            }]
		})
        offCooldown = Date.now() + 10000;
    }
    
    function onCooldown(){
        canUse = offCooldown - Date.now();
        return Date.now() < offCooldown;
    }
}