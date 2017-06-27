 {(this.state.eventData)?<View style={{backgroundColor:'rgba(0,0,0,0.5)'}}>
            <Text style={{fontSize: 20,paddingTop:0,paddingLeft:12,paddingRight:12,color:'#fff'}}>{this.state.eventData.title}</Text>
            <View style={{}}>
            <Text style={{paddingTop:5,paddingLeft:12,paddingRight:12,color:'#fff'}}>
                  <Icon name="md-pin"/>&nbsp;&nbsp;&nbsp;
                  {this.state.eventData.formatted_address}&nbsp;&nbsp;&nbsp;&nbsp;
                  <Icon name="md-person"/>&nbsp;&nbsp;
                  {this.state.eventData.host}&nbsp;&nbsp;&nbsp;
                  <Icon name="md-calendar"/>&nbsp;&nbsp;
                  {this.state.eventData.date}
            </Text>
            </View>
            <Text style={{marginTop:5,marginLeft:15,paddingLeft:12,paddingRight:12,borderLeftWidth:(this.state.eventData.title)?2:0,borderLeftColor:'#fff',fontSize: 16,color:'#fff'}}>
              {this.state.eventData.description}
            </Text>
          </View>:null}