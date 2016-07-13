
var ini_window_height = window.innerHeight - 100;
if (ini_window_height > 800){
  ini_window_height = 800;
}

var inst_section = 0;

d3.select('#graph')
  .style('height', ini_window_height+'px');


d3.json('json/mult_view.json', function(network_data){

  // define arguments object
  var args = {
    root: '#graph',
    'network_data': network_data
    // 'about':'Zoom, scroll, and click buttons to interact with the clustergram.'
  };

  // resize_container(args);

  // d3.select(window).on('resize',function(){
  //   resize_container(args);
  //   cgm.resize_viz();
  // });

  cgm = Clustergrammer(args);

  ini_scroll();

});


function ini_scroll(){

  // define the container and graph
  var gs = graphScroll()
      .container(d3.select('#container'))
      .graph(d3.selectAll('#graph'))
      .sections(d3.selectAll('#sections > .instruction'))
      .on('active', function(i){
        update_section_db(i);
      });

}

function click_reorder_button(inst_rc, inst_order){
  var inst_button = d3.selectAll('.toggle_'+inst_rc+'_order .btn')
    .filter(function(){
      return this.__data__ == inst_order;
    })[0];

  $(inst_button).click();
}


var section_key = {};
section_key[0] = initialize_view;
section_key[1] = run_filter_sum_20;
section_key[2] = reorder_row_alpha;
section_key[3] = reorder_row_var;
section_key[4] = run_filter_sum_10;
section_key[5] = initialize_view;
section_key[6] = run_conclusions;


function initialize_view(){
  console.log('initializing view');
  cgm.update_view({'N_row_sum':'all'})
}

function run_filter_sum_20(){
  console.log('sum filtering');
  cgm.update_view({'N_row_sum':20})
}

function reorder_row_alpha(){
  console.log('reorder row alpha')
  click_reorder_button('row','alpha');
}

function reorder_row_var(){
  console.log('reorder row variance')
  click_reorder_button('row','rankvar');
}

function run_filter_sum_10(){
  console.log('sum filtering');
  cgm.update_view({'N_row_sum':10})
}

function run_conclusions(){
  console.log('in conclusion')
  click_reorder_button('row','clust');
  click_reorder_button('col ','clust');
}

var update_section_db = _.debounce(update_section, 1500);

function update_section(i){

  if (inst_section != i){

    inst_section = i;

    var inst_function = section_key[i];

    console.log('\nsection '+String(i));

    if (d3.select('.toggle_col_order').select('button').attr('disabled') === null){
      inst_function();
    } else {

      // need to check that you are in the same section
      ///////////////

      console.log('--- wait until buttons not disabled')
      setTimeout(inst_function, 2000);
    }
  } else {
    console.log('already in section - do not run\n')
  }

}