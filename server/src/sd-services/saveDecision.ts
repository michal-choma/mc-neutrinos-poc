// _neu_generated_code__dont_modify_directly_
let instance = null;
//CORE_REFERENCE_IMPORTS
//append_imports_start

import cookieParser from 'cookie-parser'; //_splitter_
import { dirname } from 'path'; //_splitter_
import { fileURLToPath } from 'url'; //_splitter_
import { SDBaseService } from '../services/SDBaseService'; //_splitter_
import { TracerService } from '../services/TracerService'; //_splitter_
import log from '../utils/Logger'; //_splitter_
import { GenericRDBMSOperations } from '../utils/ndefault-sql/ExecuteSql/GenericRDBMSOperations'; //_splitter_
//append_imports_end
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export class saveDecision {
  private sdService = new SDBaseService();
  private tracerService = new TracerService();
  private app;
  private serviceBasePath: string;
  private generatedMiddlewares: Object;
  private serviceName: string;

  private globalTimers: any;
  private constructor(
    app,
    generatedeMiddlewares,
    routeCall,
    middlewareCall,
    globalTimers
  ) {
    this.serviceName = 'saveDecision';
    this.app = app;
    this.serviceBasePath = this.app.settings.base;
    this.generatedMiddlewares = generatedeMiddlewares;
    this.globalTimers = globalTimers;
  }

  static getInstance(
    app?,
    generatedeMiddlewares?,
    routeCall?,
    middlewareCall?,
    globalTimers?
  ) {
    if (!instance) {
      instance = new saveDecision(
        app,
        generatedeMiddlewares,
        routeCall,
        middlewareCall,
        globalTimers
      );
    }
    instance.mountCalls(routeCall, middlewareCall);
    return instance;
  }

  private mountCalls(routeCall, middlewareCall) {
    if (routeCall) {
      this.mountAllPaths();
      this.mountAllListeners();
    }
    if (middlewareCall) {
      this.generatedMiddlewares[this.serviceName] = {};
      this.mountAllMiddlewares();
      this.mountTimers();
    }
  }

  async mountAllListeners() {
    //append_listeners
  }

  async mountTimers() {
    //appendnew_flow_saveDecision_TimerStart
  }

  private mountAllMiddlewares() {
    log.debug('mounting all middlewares for service :: saveDecision');
    //appendnew_flow_saveDecision_MiddlewareStart
  }

  private mountAllPaths() {
    log.debug('mounting all paths for service :: saveDecision');

    this.app['post'](
      `${this.serviceBasePath}/save-decision`,
      cookieParser(),
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'pre',
        this.generatedMiddlewares
      ),

      async (req, res, next) => {
        let bh: any = {};
        try {
          bh = this.sdService.__constructDefault(
            { local: {}, input: {} },
            req,
            res,
            next
          );
          let parentSpanInst = null;
          bh = await this.buildQuery(bh, parentSpanInst);
          //appendnew_next_sd_qMCpKnKYxmR2LZoV
        } catch (e) {
          return await this.errorHandler(bh, e, 'sd_qMCpKnKYxmR2LZoV');
        }
      },
      this.sdService.getMiddlesWaresBySequenceId(
        null,
        'post',
        this.generatedMiddlewares
      )
    );
    //appendnew_flow_saveDecision_HttpIn
  }
  //   service flows_saveDecision

  //appendnew_flow_saveDecision_start

  async buildQuery(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan(
      'buildQuery',
      parentSpanInst
    );
    try {
      const b = bh.input.body;
      bh.local.upsertQuery = `
    INSERT INTO claims (
      case_number, policy_number, vehicle_make, vehicle_model, vehicle_year,
      liability_pct, reserve_amount, deductible_recovery, recovery_applicable,
      handler_decision, handler_remarks, supervisor_decision, supervisor_remarks, status
    ) VALUES (
      '${b.case_number}',
      '${b.policy_number || ''}',
      '${b.vehicle_make || ''}',
      '${b.vehicle_model || ''}',
      ${b.vehicle_year || 0},
      ${b.liability_pct || 0},
      ${b.reserve_amount || 0},
      ${b.deductible_recovery || 0},
      ${b.recovery_applicable || false},
      '${b.handler_decision || ''}',
      '${b.handler_remarks || ''}',
      '${b.supervisor_decision || ''}',
      '${b.supervisor_remarks || ''}',
      '${b.status || 'pending'}'
    )
    ON CONFLICT (case_number) DO UPDATE SET
      policy_number = CASE WHEN EXCLUDED.policy_number != '' THEN EXCLUDED.policy_number ELSE claims.policy_number END,
      vehicle_make = CASE WHEN EXCLUDED.vehicle_make != '' THEN EXCLUDED.vehicle_make ELSE claims.vehicle_make END,
      vehicle_model = CASE WHEN EXCLUDED.vehicle_model != '' THEN EXCLUDED.vehicle_model ELSE claims.vehicle_model END,
      vehicle_year = CASE WHEN EXCLUDED.vehicle_year != 0 THEN EXCLUDED.vehicle_year ELSE claims.vehicle_year END,
      reserve_amount = CASE WHEN EXCLUDED.reserve_amount != 0 THEN EXCLUDED.reserve_amount ELSE claims.reserve_amount
  END,
      handler_decision = CASE WHEN EXCLUDED.handler_decision != '' THEN EXCLUDED.handler_decision ELSE
  claims.handler_decision END,
      handler_remarks = CASE WHEN EXCLUDED.handler_remarks != '' THEN EXCLUDED.handler_remarks ELSE
  claims.handler_remarks END,
      supervisor_decision = CASE WHEN EXCLUDED.supervisor_decision != '' THEN EXCLUDED.supervisor_decision ELSE
  claims.supervisor_decision END,
      supervisor_remarks = CASE WHEN EXCLUDED.supervisor_remarks != '' THEN EXCLUDED.supervisor_remarks ELSE
  claims.supervisor_remarks END,
      status = EXCLUDED.status
  `;
      this.tracerService.sendData(spanInst, bh);
      bh = await this.querySave(bh, parentSpanInst);
      //appendnew_next_buildQuery
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_cb58ddrDcRDu5TnV',
        spanInst,
        'buildQuery'
      );
    }
  }

  async querySave(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan('querySave', parentSpanInst);
    try {
      let configObj = this.sdService.getConfigObj(
        'db-config',
        'sd_NXdLAOeMJCyRLjWN'
      );
      let connectionName;
      if (
        configObj &&
        configObj.hasOwnProperty('dbOption') &&
        configObj.dbOption.hasOwnProperty('name')
      ) {
        connectionName = configObj.dbOption.name;
      } else {
        throw new Error('Cannot find the selected config name');
      }
      let params = [];
      params = params ? params : [];
      bh.local.rawResult = await new GenericRDBMSOperations().executeSQL(
        connectionName,
        bh.local.upsertQuery,
        params
      );
      this.tracerService.sendData(spanInst, bh);
      bh = await this.result(bh, parentSpanInst);
      //appendnew_next_querySave
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_HpAqsMs7n73x1Re5',
        spanInst,
        'querySave'
      );
    }
  }

  async result(bh, parentSpanInst) {
    const spanInst = this.tracerService.createSpan('result', parentSpanInst);
    try {
      bh.local.response = { success: true, message: 'Decision saved' };
      this.tracerService.sendData(spanInst, bh);
      await this.out(bh, parentSpanInst);
      //appendnew_next_result
      return bh;
    } catch (e) {
      return await this.errorHandler(
        bh,
        e,
        'sd_EUoXdunYinwzFTjO',
        spanInst,
        'result'
      );
    }
  }

  async out(bh, parentSpanInst) {
    try {
      bh.web.res.status(200).send(bh.local.response);

      return bh;
    } catch (e) {
      return await this.errorHandler(bh, e, 'sd_SDrLADm8gc47nb1s');
    }
  }

  //appendnew_node

  // error_handler_slot
  private async errorHandler(
    bh,
    e,
    src,
    parentSpanInst?,
    functionName?
  ): Promise<any> {
    console.error(e);
    bh.error = e;
    bh.errorSource = src;
    bh.errorFunName = functionName;
    this.tracerService.sendData(parentSpanInst, bh, true);
    if (bh.web.next) {
      bh.web.next(e);
    } else {
      throw e;
    }
  }
  //appendnew_flow_saveDecision_Catch
}
