require 'pg'

module Tools

  def self.postgres(params)

    pg_con = nil
    result = []
    json = (params.has_key?(:json) && params[:json] == true)

    begin

      if params.has_key?(:sql) && params[:sql].to_s != ''

        params[:sql] = "SELECT array_to_json(array_agg(query)) as data FROM (#{params[:sql]}) query" if json
        pg_con = PG.connect(host: params[:host], port: params[:port], dbname: params[:dbname], user: params[:user], password: params[:password])
        result = pg_con.exec(params[:sql])

      end

      if params.has_key?(:statement) && params[:statement].to_s != ''

        params[:values] = [] unless params.has_key?(:values)
        params[:statement] = "SELECT array_to_json(array_agg(query)) as data FROM (#{params[:statement]}) query" if json

        unless params.has_key?(:stmt_name)
          params[:stmt_name] = ''
          10.times{params[:stmt_name] << rand(97..122).chr}
        end

        pg_con = PG.connect(host: params[:host], port: params[:port], dbname: params[:dbname], user: params[:user], password: params[:password])
        pg_con.prepare(params[:stmt_name], params[:statement])
        result = pg_con.exec_prepared(params[:stmt_name], params[:values])

      end

      result = result[0]['data'] if json
      error = nil

    rescue StandardError => e

      error = {message: e.to_s}
      result = (json ? '{}' : [])

    end

    pg_con.close if pg_con

    {result: result, status: error}

  end

  def self.windows?
    (/cygwin|mswin|mingw|bccwin|wince|emx/ =~ RUBY_PLATFORM) != nil
  end

  def self.linux?
    !windows?
  end

end
