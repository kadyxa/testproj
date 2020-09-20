const http = require('http');

http.createServer(function (req, res) {
    res.write(`
		  <!DOCTYPE html>
		<html>
		 <head>
			 <meta charset="utf-8" />
		  <title>kolobok_tv_menu_srv</title>
		  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
		  <script src="http://localhost:3000/axios.js"></script>
		 </head>
		<body>
		node_srv_kolobok_tvs

		<div id="app">
		    
		    <div v-for="item in currentTvs">
		        <div @click="pickedTv = item">
		            {{item.name}}
		        </div>
		    </div>
		    
		    <div>
		        <div @click="exitTv()">X</div>
		        <div @click="saveTv(pickedTv)">saveTv</div>
		        <div @click="addItemInTv(pickedTv)">addItemInTv</div>
		        <div v-for="item in pickedTv.data">
                    <img :src="item.image" class="uploading-image" width="100px" height="100px" />
                    <input type="file" accept="image/*" @change="uploadImage($event,item)" id="file-input"><!--multiple-->
		        </div>
		    </div>
			{{resppp}}
			<div @click="getData()">
			    getData
			</div>
		</div>
        <script src="http://localhost:3000/app_srv_client.js"></script>
		</body>
		</html>	
		  `); 
    res.end(); 
}).listen(3001); 
